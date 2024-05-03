import {Box, Button, TextField} from "@mui/material";

const Login = () => {
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
                    >
                    </TextField>

                    <TextField
                        variant={"standard"}
                        required
                        label={"Password"}
                        name="password"
                        sx = { { width: "100%", border: 0, borderBottom: "1px solid grey", margin: "5px"}}
                    >
                    </TextField>
                    <Button sx = { { margin: "5px", color: "#61777F"}}>Login</Button>
                </form>
            </Box>

        </>
    );
};

export default Login;
