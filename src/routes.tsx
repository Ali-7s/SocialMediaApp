import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Login from "./pages/login/Login.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },

    {
        path: "/home",
        element: <Home/>,
    }
])