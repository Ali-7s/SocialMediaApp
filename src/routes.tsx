import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Login from "./pages/login/Login.tsx";
import Signup from "./pages/signup/Signup.tsx";
import Layout from "./layout/Layout.tsx";
import Profile from "./pages/profile/Profile.tsx";
import ChatApp from "./components/ChatApp.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/home",
                element: <Home/>,
            },
            {
                path: "/:username",
                element: <Profile/>
            },
            {
                path: "/chat/:id",  // <-- Add dynamic :id here
                element: <ChatApp/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/sign-up",
        element: <Signup/>
    }
]);
