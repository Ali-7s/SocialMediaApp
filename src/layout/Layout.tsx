import Navbar from "../components/navbar/Navbar.tsx";
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (

        <div className={"css"}>

            <Navbar/>
            <Outlet/>

        </div>
    );
};

export default Layout;
