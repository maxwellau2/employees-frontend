import React from 'react'
import { Employee } from '../store/types/Employee'
import "./styles/EmployeeItem.css";
import { useNavigate } from 'react-router-dom';
import { useDeleteEmployeeMutation } from '../store/EmployeesApi';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const EmployeeItem = ({employee}: {employee : Employee}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [deleteEmployee] = useDeleteEmployeeMutation()
    const navigate = useNavigate()
    const onEdit = (employee:Employee) =>{
        // alert("penis1")
        navigate("/CreateNewEmployee", {state: employee})
        return
    }
    
    const onDelete = () =>{
        // AlertDialog();
        handleClickOpen();
        // if(confirm("Are you sure you want to delete?")){
        //     if (employee.id !== undefined){
        //         deleteEmployee(employee.id)
        //         alert("deleted")
        //         return;
        //         }
        //    alert("id is undefined")
        // }
        // alert("aborted")
        return
    }

    const confirmDeleteEmployee = (employee:Employee) =>{
        if (employee.id !== undefined){
            deleteEmployee(employee.id)
        }
        else{
            alert("employee id is undefined")
        }
        handleClose();
        return;
    }
    return (
        <div className="employee-card">
            <div className="employee-details">
                <h2 className="employee-name">{employee.name}</h2>
                <p className="employee-department">{employee.department}</p>
                <p className="employee-salary">${employee.salary.toLocaleString()}</p>
            </div>
            <div className="employee-actions">
                <button className="edit-button" onClick={() => onEdit(employee)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete()}>Delete</button>
            </div>
            { open && <Dialog open={open} onClose={handleClose}>
                <DialogTitle> {"Delete Employee?"} </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this employee?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => confirmDeleteEmployee(employee)} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>}
        </div>
    );
  }

export default EmployeeItem