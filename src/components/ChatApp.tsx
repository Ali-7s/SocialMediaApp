import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    IconButton,
    Typography,
    Paper,
    Divider,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Badge,
    InputBase,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import { useMessages, useConversations, useUserProfile } from '../api/api';
import { Message, UserSummary, Conversation } from '../types';
import { useWebSocket } from '../contexts/WebSocketContext';

const ChatApp: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const recipientId = parseInt(id || '0', 10);
    const { user } = useUserContext();
    const { isConnected, sendMessage, onMessageReceived } = useWebSocket();

    const [messages, setMessages] = useState<Message[]>([]);
    const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});
    const [messageInput, setMessageInput] = useState('');
    const messageListRef = useRef<HTMLDivElement | null>(null);

    const { data: conversations, isLoading: loadingConversations, error: conversationsError } =
        useConversations(user.id);
    const { data: recipientProfileData } = useUserProfile(recipientId);
    const recipientProfile = recipientProfileData as UserSummary | undefined;
    const { data: fetchedMessages } = useMessages(user.id, recipientId);

    useEffect(() => {
        if (!isConnected) {
            console.error('WebSocket is disconnected');
        }
    }, [isConnected]);

    useEffect(() => {
        onMessageReceived((message: Message) => {
            if (message.recipientId === recipientId || message.senderId === recipientId) {
                setMessages((prev) => [...prev, message]);
            } else {
                setUnreadCounts((prevCounts) => ({
                    ...prevCounts,
                    [message.senderId]: (prevCounts[message.senderId] || 0) + 1,
                }));
            }
        });
    }, [onMessageReceived, recipientId]);

    useEffect(() => {
        if (recipientId !== 0 && fetchedMessages) {
            setMessages(
                fetchedMessages.filter(
                    (msg) =>
                        (msg.senderId === user.id && msg.recipientId === recipientId) ||
                        (msg.senderId === recipientId && msg.recipientId === user.id)
                )
            );
            setUnreadCounts((prevCounts) => ({ ...prevCounts, [recipientId]: 0 }));
        }
    }, [fetchedMessages, recipientId]);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (messageInput.trim() && recipientId !== 0) {
            const newMessage: Message = {
                senderId: user.id,
                recipientId: recipientProfile?.id as number,
                senderName: user.displayName,
                recipientName: recipientProfile?.displayName || '',
                content: messageInput,
                timestamp: new Date(),
            };
            sendMessage(newMessage);
            setMessages((prev) => [...prev, newMessage]);
            setMessageInput('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '85vh', backgroundColor: '#f5f5f5', paddingTop: '1rem'}}>
            {/* Sidebar */}
            <Paper
                sx={{
                    width: '25%',
                    padding: 2,
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    borderRight: '1px solid #ddd',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Conversations
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {loadingConversations ? (
                    <Typography>Loading...</Typography>
                ) : conversationsError ? (
                    <Typography>Error loading conversations</Typography>
                ) : (
                    <List>
                        {conversations?.map((conv: Conversation) => (
                            <ListItem
                                key={conv.userSummary.id}
                                onClick={() => navigate(`/chat/${conv.userSummary.id}`)}
                                sx={{
                                    backgroundColor:
                                        conv.userSummary.id === recipientId ? '#E3F2FD' : 'transparent',
                                    borderRadius: 2,
                                    marginY: 1,
                                    cursor: 'pointer',
                                }}
                            >
                                <ListItemAvatar>
                                    <Badge
                                        badgeContent={unreadCounts[conv.userSummary.id] || 0}
                                        color="primary"
                                    >
                                        <Avatar src={conv.userSummary.photoUrl || ''} />
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={conv.userSummary.displayName}
                                    secondary={
                                        unreadCounts[conv.userSummary.id]
                                            ? `${unreadCounts[conv.userSummary.id]} new messages`
                                            : conv.lastMessage.content || 'No messages yet'
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>

            {/* Chat Section */}
            <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column', padding: 2 }}>
                {recipientId === 0 ? (
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h5" color="textSecondary">
                            Select a conversation to start chatting
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingBottom: 2,
                                borderBottom: '1px solid #ddd',
                            }}
                        >
                            <Avatar
                                src={recipientProfile?.photoUrl || ''}
                                sx={{ marginRight: 2, width: 50, height: 50 }}
                            />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: "black" }}>
                                {recipientProfile?.displayName}
                            </Typography>
                        </Box>
                        <Box
                            ref={messageListRef}
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: 2,
                                backgroundColor: '#f9f9f9',
                                borderRadius: 2,
                            }}
                        >
                            {messages.map((msg, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent:
                                            msg.senderId === user.id ? 'flex-end' : 'flex-start',
                                        marginBottom: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            maxWidth: '70%',
                                            padding: '12px 16px',
                                            backgroundColor:
                                                msg.senderId === user.id ? '#4A90E2' : '#ECECEC',
                                            color: msg.senderId === user.id ? '#fff' : '#333',
                                            borderRadius: '20px',
                                            boxShadow:
                                                msg.senderId === user.id
                                                    ? '0px 4px 8px rgba(74, 144, 226, 0.2)'
                                                    : '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                            fontSize: '0.9rem',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        <Typography>{msg.content}</Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                display: 'block',
                                                marginTop: 0.5,
                                                textAlign: 'right',
                                                fontSize: '0.8rem',
                                                color: msg.senderId === user.id ? '#fff' : '#666',
                                            }}
                                        >
                                            {new Date(msg.timestamp).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 2,
                                padding: 1,
                                borderRadius: '30px',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            }}
                        >
                            <InputBase
                                fullWidth
                                placeholder="Type a message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                sx={{ padding: '0 1em', fontSize: '16px' }}
                            />
                            <IconButton
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                                sx={{
                                    backgroundColor: '#4A90E2',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#357ABD' },
                                    marginLeft: 1,
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default ChatApp;
