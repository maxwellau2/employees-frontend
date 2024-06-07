import ".//Navbar.css";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomIconButton from "../common/CustomIconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useWindowDimensions from "../../custom-hooks/GetWindowDimesions";

interface NavbarProps {
    disabled: boolean;
}

const Navbar = (props: NavbarProps) => {
    const navigate = useNavigate();
    // function onFilterChange(){
    //     return;
    // }
    const { width } = useWindowDimensions();
    const isMobileView: boolean = width < 600;

    function onCreateEmployee() {
        navigate("/CreateNewEmployee", {
            state: { id: null, name: "", salary: 0, department: "" },
        });
        return;
    }
    return (
        <Stack direction={"row"} className="navbar">
            {" "}
            {/* top blue bar, row stack */}
            <Typography
                variant="h4"
                sx={{ fontWeight: "bold" }}
                className="navbar-title"
            >
                Employees
            </Typography>
            {/* create employee btn */}
            <CustomIconButton
                disabled={props.disabled}
                icon={
                    isMobileView ? (
                        <AddCircleIcon sx={{ color: "#f0f0f0" }} />
                    ) : (
                        <AddCircleOutlineIcon />
                    )
                }
                text="Create Employee"
                onClick={onCreateEmployee}
            />
        </Stack>
    );
};

export default Navbar;
