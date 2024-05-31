import {Box, Button, TextField} from "@mui/material";
import React, {useState} from "react";
import axios, {AxiosError} from "axios";
import {API_URL} from "../../api/api.ts";
import {useNavigate} from "react-router-dom";
import {UserRegistration, ValidationErrorResponse} from "../../types.tsx";
import {toastError, toastSuccess} from "../../services/ToastService.tsx";

const Signup = () => {
    const [errors, setErrors] = useState<ValidationErrorResponse[]>([]);
    const navigate = useNavigate();
    const [user, setUser] = useState<UserRegistration>(        {
        email: '',
        username: '',
        displayName: '',
        password: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const handleSignupClick  = () => {
        handleSignup()
        console.log(user)
    }

    const handleSignup = () => {
       axios.post(API_URL + "/auth/register", user, {
            headers: {'Content-Type': 'application/json'}
        }).then( () => {
            toastSuccess("Account successfully created")
            navigate("/")
       }).catch((error: Error | AxiosError) => {
            if (axios.isAxiosError(error)) {
                setErrors(error.response?.data.data.errors)
                {errors.map((error) => (
                    toastError(error.message)
                ))}
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
                        label={"Username"}
                        name="username"
                        sx = { { width: "100%", border: 0, borderBottom: "1px solid grey", margin: "5px", color: "#61777F"}}
                        onChange={handleChange}
                    >
                    </TextField>

                    <TextField
                        variant={"standard"}
                        required
                        label={"Display Name"}
                        name="displayName"
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
                    <Button sx = { { margin: "5px", color: "#61777F"}} onClick={handleSignupClick}>Sign Up</Button>

                </form>
            </Box>

        </>
    );
}
export default Signup

