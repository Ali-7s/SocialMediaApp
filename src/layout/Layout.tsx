import { ReactNode } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/navbar/Navbar.tsx";
import {Sidebar} from "../components/sidebar/Sidebar.tsx";
import CreatePostBox from "../components/createpost/CreatePostBox.tsx";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar/>
            <Box sx={
                { backgroundColor: "#white",
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        lg: "row"
                    },
                    color: "white",
                    padding: 3,
                    gap: 3,
                    overflowY: "hidden",
                    height: "100vh",
                    paddingTop: "100px",
                }
            }>
                <Sidebar/>

                <Box sx={{ width: "50vw", overflowY: "scroll"}}>
                    <CreatePostBox/>
                    {children }

                </Box>
            </Box>
        </>
    );
};

export default Layout;
