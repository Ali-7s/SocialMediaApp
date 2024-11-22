import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { Message, WebSocketContextProviderProps } from '../types';

interface WebSocketContextProps {
    client: Client | null;
    isConnected: boolean;
    sendMessage: (msg: Message) => void;
    subscribeToTopic: (destination: string, callback: (message: Message) => void) => void;
    onMessageReceived: (callback: (message: Message) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export const WebSocketProvider: React.FC<WebSocketContextProviderProps> = ({ token, children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const clientRef = useRef<Client | null>(null);
    const messageCallbackRef = useRef<(message: Message) => void>();

    useEffect(() => {
        if (token) {
            const client = new Client({
                connectHeaders: { Authorization: `Bearer ${token}` },
                webSocketFactory: () => new SockJS('https://socialmediaapi-production-88fb.up.railway.app/ws'),
                onConnect: () => {
                    setIsConnected(true);
                    client.subscribe('/user/queue/messages', (msg) => {
                        try {
                            const parsedMessage = JSON.parse(msg.body) as Message;
                            if (messageCallbackRef.current) {
                                messageCallbackRef.current(parsedMessage);
                            }
                        } catch (error) {
                            console.error('Error parsing message:', error);
                        }
                    });
                },
                onDisconnect: () => {
                    setIsConnected(false);
                },
                debug: (msg) => console.error('WebSocket debug:', msg),
            });

            client.activate();
            clientRef.current = client;

            return () => {
                client.deactivate();
                clientRef.current = null;
            };
        }
    }, [token]);

    const sendMessage = (msg: Message) => {
        if (msg && clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/chat',
                body: JSON.stringify(msg),
            });
        }
    };

    const subscribeToTopic = (destination: string, callback: (message: Message) => void) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.subscribe(destination, (msg) => {
                const parsedMessage = JSON.parse(msg.body) as Message;
                callback(parsedMessage);
            });
        }
    };

    const onMessageReceived = (callback: (message: Message) => void) => {
        messageCallbackRef.current = callback;
    };

    return (
        <WebSocketContext.Provider
            value={{ client: clientRef.current, isConnected, sendMessage, subscribeToTopic, onMessageReceived }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
