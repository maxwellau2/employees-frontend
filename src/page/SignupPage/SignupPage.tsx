import { useEffect, useState } from "react";
import "./SignupPage.css";
import {
    Box,
    Button,
    Typography,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";
import { PasswordValidationResult, validatePassword } from "./utils";
import { usePostUserSignupMutation } from "../../store/slices/EmployeesApi";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const SignupPage = () => {
    // the usual use state for passwords and usernames
    const [username, setUsername] = useState("");
    const [departmentId, setDepartmentId] = useState(0);

    // password hooks
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isStrongPassword, setIsStrongPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // button disabler
    const [disableButton, setDisableButton] = useState(true);
    const [signupError, setSignupError] = useState<string | null>(null);

    // api call
    const [postSignup] = usePostUserSignupMutation();

    // navigation
    const navigate = useNavigate();

    // password checker
    useEffect(() => {
        const result: PasswordValidationResult = validatePassword(password);
        setPasswordError(result.errorMessage);
        setIsStrongPassword(result.isStrong);
    }, [password]);

    // confirm password checker
    useEffect(() => {
        if (!isStrongPassword) {
            setDisableButton(true);
            return;
        }
        if (password === "" || confirmPassword === "") {
            setDisableButton(true);
            return;
        }
        if (password != confirmPassword) {
            setConfirmPasswordError("Passwords must match");
            return;
        }
        setConfirmPasswordError("");
        setDisableButton(false);
        return;
    }, [password, confirmPassword, isStrongPassword]);

    const handleSignup = async () => {
        setSignupError("");
        // hashing the password
        try {
            const result = await postSignup({
                username,
                password,
                departmentId,
            }).unwrap();
            if (result.status === "failed") setSignupError(result.message);
            else {
                setSignupError("Sucessfully created user");
                alert("Successfully created User");
                navigate("/");
            }
        } catch (error) {
            setSignupError("Signup failed. Please try again.");
        }
    };

    return (
        <Box className="signup-bg">
            <Button
                variant="contained"
                onClick={() => {
                    navigate("/");
                }}
            >
                Go back
            </Button>
            <Typography sx={{ color: "black", fontSize: "30px" }}>
                Sign Up Page
            </Typography>

            {/* username inputs */}
            <Typography
                sx={{ color: "black", textAlign: "left", marginLeft: "5px" }}
            >
                Username
            </Typography>
            <TextField
                name="username"
                size="small"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            ></TextField>

            {/* department dropdown */}
            <Typography
                sx={{ color: "black", textAlign: "left", marginLeft: "5px" }}
            >
                Department
            </Typography>
            <Select
                onChange={(e) => setDepartmentId(+e.target.value)}
                defaultValue=""
                size="small"
            >
                <MenuItem value={0}></MenuItem>
                <MenuItem value={1}>HR</MenuItem>
                <MenuItem value={2}>PS</MenuItem>
                <MenuItem value={3}>admin</MenuItem>
            </Select>

            {/* password inputs + error handler*/}
            <Typography
                sx={{ color: "black", textAlign: "left", marginLeft: "5px" }}
            >
                Password
            </Typography>
            <TextField
                name="password"
                type="password"
                size="small"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            ></TextField>
            <Typography
                sx={{
                    color: "red",
                    textAlign: "left",
                    marginLeft: "5px",
                    fontSize: "15px",
                }}
            >
                {passwordError}
            </Typography>

            {/* confirm password inputs + error handler*/}
            <Typography
                sx={{ color: "black", textAlign: "left", marginLeft: "5px" }}
            >
                Confirm Password
            </Typography>
            <TextField
                name="confirmpassword"
                type="password"
                size="small"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}
            ></TextField>
            <Typography
                sx={{
                    color: "red",
                    textAlign: "left",
                    marginLeft: "5px",
                    fontSize: "15px",
                }}
            >
                {confirmPasswordError}
            </Typography>
            <Button
                onClick={handleSignup}
                disabled={disableButton}
                variant="outlined"
                sx={{ marginTop: "15px" }}
            >
                Submit
            </Button>

            {signupError && (
                <Typography
                    sx={{
                        color: "blue",
                        textAlign: "left",
                        marginLeft: "5px",
                        fontSize: "15px",
                        marginTop: "10px",
                    }}
                >
                    {signupError}
                </Typography>
            )}
        </Box>
    );
};

export default SignupPage;
