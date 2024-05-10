import {Avatar, Box, Hidden, Typography} from "@mui/material";

export const Sidebar = () => {

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

                <Avatar sx={ { width: "55%", height: "45%", marginRight: "5px", marginTop: "5px"}} aria-label="avatar" src={"https://img.freepik.com/free-vector/cute-koala-with-cub-cartoon-icon-illustration_138676-2839.jpg?w=1380&t=st=1715294086~exp=1715294686~hmac=ff8e23e681a9bc14887363d97e79d43018ed0ff4fe6482b666d31b6b632048c6"}/>
                <Hidden smDown>
                    <Typography variant="h5" component="h1" my={2} fontWeight={400} fontSize={18} sx={ {color: "black"}} >Welcome, User</Typography>
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
