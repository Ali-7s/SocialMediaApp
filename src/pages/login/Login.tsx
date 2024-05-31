import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {UserLogin} from "../../types.tsx";
import {useNavigate} from "react-router-dom";
import {API_URL} from "../../api/api.ts";
import {toastError} from "../../services/ToastService.tsx";

const Login = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState<UserLogin>(
        {
            email: '',
            password: ''
        }
    )

    useEffect(() => {
        if(auth) {
            navigate("/home")
        }

    }, [auth, navigate]);


    const handleLoginClick  = () => {
        handleLogin()
        console.log(user)
    }

    const handleSignUpClick = () => {
        console.log("Sign up clicked")
        navigate("/sign-up")
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [event.target.name]: event.target.value})
    }
    const handleLogin = () => {
        axios.post( API_URL + "/auth/login", user, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                const jwtToken = res.headers.authorization;
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                }
            }).catch((error: Error | AxiosError) => {
            if (axios.isAxiosError(error)) {
                toastError("Login failed. Please try again")
            }
        })

    }

    return (
        <>
            <Box sx = { { width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "0 auto"}}>
                <form style = { { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "400px", height: "350px"}}>
                    <TextField
                        variant={"standard"}
                        required
                        label={"Email"}
                        name="email"
                        sx = { { width: "100%", border: 0, borderBottom: "1px solid grey", margin: "5px", color: "#61777F"}}
                        onChange={handleChange}
                    >
                    </TextField>

                    <TextField
                        variant={"standard"}
                        required
                        label={"Password"}
                        type={"password"}
                        name="password"
                        sx = { { width: "100%", border: 0, borderBottom: "1px solid grey", margin: "5px"}}
                        onChange={handleChange}
                    >
                    </TextField>
                    <Button sx = { { margin: "5px", color: "#61777F"}} onClick={handleLoginClick}>Login</Button>
                    <Typography sx={ { color: "black" }}>Don't have an account? <Button onClick={handleSignUpClick}>Sign up</Button></Typography>
                </form>
            </Box>

        </>
    );
};

export default Login;
