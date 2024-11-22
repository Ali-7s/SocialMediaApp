import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.tsx";
import ReactQuery from "./components/TanstackProvider/TanstackProvider.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import UserContextProvider from "./contexts/UserContext.tsx";
import {WebSocketProvider} from "./contexts/WebSocketContext.tsx";
import  {useEffect, useState} from "react";

function App() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const jwt = sessionStorage.getItem("jwt")
        if(jwt && jwt != "") {
            setToken(jwt)
        }
    }, []);

    return (
        <WebSocketProvider token={token!}>
        <UserContextProvider>
        <ReactQuery>
            <ToastContainer/>
        <RouterProvider router={router}/>
        </ReactQuery>
        </UserContextProvider>
        </WebSocketProvider>
    )
}

export default App
