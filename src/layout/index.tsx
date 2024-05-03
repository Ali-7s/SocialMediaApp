import { ReactNode } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/navbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar/>
                <Box sx={ {  width: "100vw", height: "100vh", marginTop: "85px", backgroundColor: "white"}}>
                    {children}
                </Box>
        </>
    );
};

export default Layout;
