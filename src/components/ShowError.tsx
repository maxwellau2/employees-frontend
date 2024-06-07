import { Alert, Box, Button } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface IShowError {
    errorMessage: string;
    error: FetchBaseQueryError | SerializedError | undefined | null;
}

function parseError(
    error: FetchBaseQueryError | SerializedError | undefined | null,
    navigate: NavigateFunction
) {
    if (error === null || error === undefined) return <Box></Box>;
    if ("status" in error) {
        console.log(error.status);
        if ([403, 401].includes(+error.status)) {
            return (
                <Alert severity="warning">
                    Please log in{" "}
                    <Button onClick={() => navigate("/")}>here</Button>
                </Alert>
            );
        }
    }
}

const ShowError = (prop: IShowError) => {
    const navigate = useNavigate();
    // Could be more sphisticated, but this will suffice for now
    return (
        <Box>
            {prop.error ? (
                parseError(prop.error, navigate)
            ) : (
                <Alert severity="warning">{prop.errorMessage}</Alert>
            )}
        </Box>
    );
};

export default ShowError;
