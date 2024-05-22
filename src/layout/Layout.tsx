import Navbar from "../components/navbar/Navbar.tsx";
import { Outlet } from 'react-router-dom';
import UserContextProvider from "../contexts/UserContext.tsx";

const Layout = () => {
    return (

        <div className={"css"}>
            <UserContextProvider>
            <Navbar/>
            <Outlet/>
            </UserContextProvider>
        </div>
    );
};

export default Layout;
