import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

import { Logout } from "@mui/icons-material";

const Navbar = () => {
    return (
        <AppBar sx={ { backgroundColor: "#61777F", color: "white", width: "100%"}}>
            <Toolbar sx={ { display: "flex", justifyContent: "space-between"}}>
                <IconButton size='large' color='inherit' aria-label='logo' sx={ { display: "flex", justifySelf: "start"}}>
                    <Typography>Home</Typography>
                </IconButton>
                <IconButton size='large' color='inherit' aria-label='logo' sx={ { display: "flex", justifySelf: "end"}}>
                    <Logout sx={ { marginRight: "5px"}} ></Logout>
                    <Typography>Log Out</Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;


