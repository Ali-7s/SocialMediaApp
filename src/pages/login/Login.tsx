import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { User, UserLogin } from "../../types.tsx";
import { useNavigate } from "react-router-dom";
import { API_URL, getAuthedUser } from "../../api/api.ts";
import { toastError, toastSuccess } from "../../services/ToastService.tsx";
import { useUserContext } from "../../hooks/useUserContext.tsx";

const Login = () => {
    const navigate = useNavigate();
    const { setUser, setAuth } = useUserContext();
    const [userLogin, setUserLogin] = useState<UserLogin>({ email: "", password: "" });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, userLogin, {
                headers: { "Content-Type": "application/json" },
            });
            const jwtToken = response.headers.authorization;

            if (jwtToken) {
                sessionStorage.setItem("jwt", jwtToken);
                const authedUser = await getAuthedUser() as User;
                setUser(authedUser);
                setAuth(true);
                toastSuccess("Logged in successfully");
                navigate("/home");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toastError("Login failed. Please try again");
            }
        }
    };

    return (
        <>
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "0 auto",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        marginBottom: "20px",
                        color: "#61777F",
                        fontWeight: "bold",
                        letterSpacing: "1.5px",
                    }}
                >
                    A Social
                </Typography>

                <form
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "400px",
                        height: "250px",
                    }}
                >
                    <TextField
                        variant={"standard"}
                        required
                        label={"Email"}
                        name="email"
                        sx={{
                            width: "100%",
                            border: 0,
                            borderBottom: "1px solid grey",
                            margin: "5px",
                            color: "#61777F",
                        }}
                        onChange={handleChange}
                    ></TextField>

                    <TextField
                        variant={"standard"}
                        required
                        label={"Password"}
                        type={"password"}
                        name="password"
                        sx={{
                            width: "100%",
                            border: 0,
                            borderBottom: "1px solid grey",
                            margin: "5px",
                        }}
                        onChange={handleChange}
                    ></TextField>

                    <Button
                        sx={{
                            margin: "5px",
                            color: "#61777F",
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </form>

                <Typography variant="body2" sx={{ marginTop: 1, color: "black" }}>
                    Don't have an account?{" "}
                    <Button
                        variant="text"
                        onClick={() => navigate("/sign-up")}
                        sx={{
                            textTransform: "none",
                            padding: 0,
                            color: "#61777F",
                        }}
                    >
                        Sign up
                    </Button>
                </Typography>
            </Box>
        </>
    );
};

export default Login;
