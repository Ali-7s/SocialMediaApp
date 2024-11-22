import { Outlet } from 'react-router-dom';
import Navbar from "../components/navbar/Navbar.tsx";

const Layout = () => {
    return (
        <div className={"css"}>
            <Navbar />
            <Outlet/>
        </div>
    );
};

export default Layout;
