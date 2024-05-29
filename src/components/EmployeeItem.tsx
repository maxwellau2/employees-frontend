import React from 'react'
import { Employee } from '../store/types/Employee'
import "./styles/EmployeeItem.css";

const onEdit = (employee:Employee) =>{
    alert("penis1")
    return
}

const onDelete = (employee:Employee) =>{
    alert("penis2")
    return
}

const EmployeeItem = ({employee}: {employee : Employee}) => {
    return (
        <div className="employee-card">
            <div className="employee-details">
                <h2 className="employee-name">{employee.name}</h2>
                <p className="employee-department">{employee.department}</p>
                <p className="employee-salary">${employee.salary.toLocaleString()}</p>
            </div>
            <div className="employee-actions">
                <button className="edit-button" onClick={() => onEdit(employee)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(employee)}>Delete</button>
            </div>
        </div>
    );
  }

export default EmployeeItem