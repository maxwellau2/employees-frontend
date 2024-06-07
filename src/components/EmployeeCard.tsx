import React from "react";
import { Employee } from "../store/types/Employee";
import "./EmployeeCard.css";
import { useNavigate } from "react-router-dom";
import { useDeleteEmployeeMutation } from "../store/slices/EmployeesApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography } from "@mui/material";

const EmployeeItem = ({ employee }: { employee: Employee }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const navigate = useNavigate();
  const onEdit = (employee: Employee) => {
    navigate("/CreateNewEmployee", { state: employee });
    return;
  };

  const onDelete = () => {
    handleClickOpen();
    return;
  };

  const confirmDeleteEmployee = (employee: Employee) => {
    if (employee.id !== undefined) {
      deleteEmployee(employee.id);
    } else {
      alert("employee id is undefined");
    }
    handleClose();
    return;
  };

  return (
    <Box className="employee-card">
      {" "}
      {/* flex row */}
      {/* Employee Details, LHS of card */}
      <Box className="employee-details">
        <Typography
          sx={{
            fontSize: "1.5em",
            fontWeight: "bold",
            color: "1c4572",
            textAlign: "left",
          }}
          className="employee-name"
        >
          {employee.name}
        </Typography>
        <Typography sx={{ fontSize: "1.2em", margin: 0, color: "#1c4572" }}>
          {employee.department}
        </Typography>
        <Typography sx={{ fontSize: "1em", color: "#1c4572" }}>
          ${employee.salary.toFixed(2).toLocaleString()}
        </Typography>
      </Box>
      {/* Action buttons */}
      <Box className="employee-actions">
        {/* {edit icon button} */}
        <IconButton
          aria-label="edit"
          color="warning"
          onClick={() => onEdit(employee)}
        >
          <EditIcon />
        </IconButton>
        {/* {edit icon button} */}
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => onDelete()}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      {/* Dialog Opening */}
      {open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle> {"Delete Employee?"} </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this employee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => confirmDeleteEmployee(employee)} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default EmployeeItem;
