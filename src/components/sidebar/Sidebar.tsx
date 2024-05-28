import {Avatar, Box, Hidden, Typography} from "@mui/material";
import { User } from "../../types.tsx";

interface UserProps {
    user: User
}

export const Sidebar = ( { user } : UserProps )  => {



    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                padding: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: {
                    xs: "row",
                    lg: "column"
                },
                alignItems: "center",
                justifyContent: "space-between",
                width: {
                    sm: "100%",
                    lg: 200
                }}
            }>
            <Box sx={{
                display: "flex",
                flexDirection: {
                    xs: "row",
                    lg: "column",
                },
                gap: 5,
                alignItems: {
                    xs: "center",
                    ls: "start"
                },
                width: "100%"
            }}>

                <Avatar sx={ { width: "55%", height: "45%", marginRight: "5px", marginTop: "5px"}} aria-label="avatar" src={user.photoUrl}/>
                <Hidden smDown>
                    <Typography variant="h5" component="h1" my={2} fontWeight={400} fontSize={18} sx={ {color: "black"}} >Welcome, { user.displayName }</Typography>
                </Hidden>
                <Box
                    sx ={{
                        py: {
                            xs: "0px",
                            ls: "16px"
                        },
                        display: "flex",
                        flexDirection: {
                            xs: "row",
                            lg: "column"
                        },
                        gap: 4
                    }}>

                </Box>

            </Box>
        </Box>
    );
};
