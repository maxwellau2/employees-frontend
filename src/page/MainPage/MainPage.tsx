import EmployeeItem from "../../components/EmployeeCard/EmployeeCard";
import "./MainPage.css";
import Navbar from "../../components/Navbar/Navbar";
import { useGetEmployeeWindowQuery } from "../../store/slices/EmployeesApi";
import PageHandler from "../../components/PageHandler/PageHandler";
import ShowError from "../../components/ShowError";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function isAuthError(
    error: FetchBaseQueryError | SerializedError | undefined | null
) {
    if (error === null || error === undefined) return false;
    if ("status" in error) {
        if ([403, 401].includes(+error.status)) {
            return true;
        }
    }
    return true;
}

const MainPage = () => {
    const [pageState, setPageState] = useState(0);
    const window_size = 10;
    const {
        data: employees,
        error,
        isLoading,
    } = useGetEmployeeWindowQuery({
        pageNumber: pageState,
        windowSize: window_size,
    });

    useEffect(() => {
        if (employees) {
            if (employees!.employees.length == 0 && pageState != 0) {
                setPageState(pageState - 1);
            }
        }
    }, [employees]);

    if (isLoading) return <Box>Loading...</Box>;
    // if (error) return <Box>Error: {String(error)}</Box>;
    console.log(employees);
    return (
        <Box className="apply-blur">
            <Box className="apply-bg">
                <Navbar disabled={isAuthError(error)} />
                <Box className="employees-grid">
                    {error ? (
                        <ShowError
                            error={error}
                            errorMessage="oops, somthing went wrong"
                        />
                    ) : (
                        employees!.employees.map((emp, idx) => (
                            <EmployeeItem employee={emp} key={idx} />
                        ))
                    )}
                    {employees?.employees.length == 0 && (
                        <ShowError
                            error={null}
                            errorMessage="No employees found, create an Employee!"
                        />
                    )}
                </Box>
                {/* for page handler, i use prop drilling because we dont need the state elsewhere */}
                {error ? (
                    <Box>No pages to display</Box>
                ) : (
                    <PageHandler
                        pageNumber={pageState + 1}
                        totalEntries={employees!.totalEmployees}
                        start={window_size * pageState}
                        end={
                            employees!.employees.length +
                            window_size * pageState
                        }
                        state={[pageState, setPageState]}
                    />
                )}
            </Box>
        </Box>
    );
};

export default MainPage;
