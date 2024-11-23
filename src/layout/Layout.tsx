import {Outlet, useNavigate} from 'react-router-dom';
import Navbar from "../components/navbar/Navbar.tsx";
import {useUserContext} from "../hooks/useUserContext.tsx";
import {useEffect} from "react";

const Layout = () => {
    const navigate = useNavigate();
    const { auth} = useUserContext();



    useEffect(() => {
        if(!auth) {
            navigate("/login");
        }
    }, [auth, navigate]);
    return (
        <div className={"css"}>
            <Navbar />
            <Outlet/>
        </div>
    );
};

export default Layout;
