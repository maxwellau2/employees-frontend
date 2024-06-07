import { Box } from "@mui/material";
import { FormControl, TextField, Typography, Button } from "@mui/material";
import "./LoginPage.css";
import { useState } from "react";
import { usePostUserLoginMutation } from "../../store/slices/EmployeesApi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = usePostUserLoginMutation();
  const navigate = useNavigate();

  async function handleLogin() {
    const result = await login({ username: username, password: password });
    if (result.data?.status === "success") {
      alert("sucessfully logged in!");
      navigate("/users");
      return;
    }
    alert("lolol");
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
        </Box>
      </FormControl>
    </Box>
  );
};

export default LoginPage;
