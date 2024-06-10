import { Box } from "@mui/material";
import { FormControl, TextField, Typography, Button } from "@mui/material";
import "./LoginPage.css";
import { useState } from "react";
import { usePostUserLoginMutation } from "../../store/slices/UsersApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { employeesApi } from "../../store/slices/EmployeesApi";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login] = usePostUserLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogin() {
        const result = await login({ username: username, password: password });
        if (result.data?.status === "success") {
            // alert("sucessfully logged in!");
            dispatch(employeesApi.util.invalidateTags(["Employees"])); // invalidate tag to update users screen
            navigate("/users");
            return;
        }
        alert("catastrophic failure");
    }

    async function redirectSignup() {
        navigate("/signup");
        return;
    }

    return (
        <Box>
            <FormControl>
                <Box className="login-background">
                    <Typography sx={{ color: "black", fontSize: "2rem" }}>
                        Login Page
                    </Typography>
                    <Typography sx={{ color: "black" }}>Username</Typography>
                    <TextField
                        name="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    ></TextField>
                    <Typography sx={{ color: "black" }}>Password</Typography>
                    <TextField
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    ></TextField>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleLogin();
                        }}
                    >
                        Log In
                    </Button>
                    <Box></Box>
                    <Typography sx={{ color: "black" }}>
                        Don't have an account?
                    </Typography>
                    <Button
                        onClick={() => {
                            redirectSignup();
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </FormControl>
        </Box>
    );
};

export default LoginPage;
