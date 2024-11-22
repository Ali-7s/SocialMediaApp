import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Tooltip,
} from "@mui/material";
import { Home, Logout } from "@mui/icons-material";
import ChatSharpIcon from "@mui/icons-material/ChatSharp";
import { useUserContext } from "../../hooks/useUserContext.tsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { setUser, setAuth } = useUserContext();

    const handleLogoutClick = () => {
        setUser({
            id: 0,
            username: "",
            displayName: "",
            photoUrl: "",
        });
        sessionStorage.removeItem("jwt");
        localStorage.removeItem("user");
        setAuth(false);
        navigate("/login");
    };

    const handleHomeClick = () => {
        navigate("/home");
    };

    const handleMessagesClick = () => {
        navigate("/chat/0");
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "#ffffff",
                color: "#333",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                borderBottom: "1px solid #e0e0e0",
                zIndex: 1000,
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 1em",
                }}
            >
                {/* Home Icon */}
                <Tooltip title="Home" arrow>
                    <IconButton
                        onClick={handleHomeClick}
                        size="large"
                        color="inherit"
                        sx={{
                            '&:hover': { color: "#4A90E2" },
                            transition: "color 0.3s",
                        }}
                    >
                        <Home sx={{ fontSize: 30 }} />
                    </IconButton>
                </Tooltip>

                {/* Messages Icon */}
                <Tooltip title="Messages" arrow>
                    <IconButton
                        onClick={handleMessagesClick}
                        size="large"
                        color="inherit"
                        sx={{
                            '&:hover': { color: "#4A90E2" },
                            transition: "color 0.3s",
                        }}
                    >
                        <ChatSharpIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Tooltip>



                {/* Logout Button */}
                <Tooltip title="Logout" arrow>
                    <IconButton
                        onClick={handleLogoutClick}
                        size="large"
                        color="inherit"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.5em",
                            '&:hover': {
                                backgroundColor: "#f5f5f5",
                                color: "#4A90E2",
                            },
                            transition: "background-color 0.3s, color 0.3s",
                            ml: 2,
                        }}
                    >
                        <Logout sx={{ mr: 0.5 }} />
                        <Typography
                            sx={{
                                display: { xs: "none", sm: "block" },
                                fontWeight: 600,
                                fontSize: "0.875rem",
                            }}
                        >
                            Logout
                        </Typography>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
