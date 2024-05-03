import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";


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