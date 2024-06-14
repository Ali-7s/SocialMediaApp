import {AppBar, Toolbar, IconButton, Typography, Box, Paper, InputBase, InputAdornment} from "@mui/material";

import { Logout } from "@mui/icons-material";
import  Search  from '@mui/icons-material/Search';
import {useUserContext} from "../../hooks/useUserContext.tsx";

const Navbar = () => {
    const { auth, setAuth, setUser } = useUserContext();

    const handleLogoutClick = () => {
        setUser({
            "id": 0,
            "username": "",
            "displayName": "",
            "email": "",
            "role": "",
            "createdAt": "",
            "photoUrl": "",})
        setAuth( !auth);
    }


    return (
        <AppBar sx={ { backgroundColor: "#61777F", color: "white", width: "100%"}}>
            <Toolbar sx={ { display: "flex", justifyContent: "space-between"}}>
                <IconButton size='large' color='inherit' aria-label='logo' sx={ { display: "flex", justifySelf: "start"}}>
                    <Typography>Home</Typography>
                </IconButton>


                <Box>
                    <Paper
                        component="form"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "default",
                            p: 1,
                            backgroundColor: "#f6f1f1",
                            border: "none",
                        }}
                    >
                        <InputBase
                            placeholder="Search for posts"
                            sx={{
                                ml: 1,
                                flex: 1,
                                color: "black",
                                border: "none",
                            }}

                            startAdornment={
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            }
                        />
                    </Paper>
                </Box>



                <IconButton onClick={handleLogoutClick} size='large' color='inherit' aria-label='logo' sx={ { display: "flex", justifySelf: "end"}}>
                    <Logout sx={ { marginRight: "5px"}} ></Logout>
                    <Typography>Log Out</Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;


