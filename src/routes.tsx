import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Login from "./pages/login/Login.tsx";
import Signup from "./pages/signup/Signup.tsx";
import Layout from "./layout/Layout.tsx";


export const router = createBrowserRouter([
    {
        path: "/home",
        element: <Layout/>,
        children: [
            {
                path: "/home",
                element: <Home/>,
            }

        ]
    },

    {
        path: "/",
        element: <Login/>
    },

    {
        path: "/sign-up",
        element: <Signup/>
    }
])