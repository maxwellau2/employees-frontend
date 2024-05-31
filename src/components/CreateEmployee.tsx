import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Employee,  } from '../store/types/Employee'
import "./styles/CreateEmployee.css"
import { useCreateNewEmployeeMutation, useModifyEmployeeMutation } from '../store/EmployeesApi'

interface CreateEmployeeProps {
  employee?: Employee;
}

function validateInput(employee:Employee): number{
  if (employee.name.length < 4){
    alert("characters need to be min 4 characters")
    return 0;
  }
  if (employee.name.length > 30){
    alert("characters need to be max 30 characters")
    return 0;
  }
  if (employee.salary <= 0){
    alert("salary need to be positive")
    return 0;
  }
  if (!['HR', 'PS'].includes(employee.department)){
    alert("department must be one of HR or PS")
    return 0;
  }
  return 1;
}

const CreateEmployee: React.FC<CreateEmployeeProps> = ({ employee }) => {
  const {state} = useLocation();
  const {name : n, salary : s, department : d } = state;
  let id = null;
  if ("id" in state){
    id = state['id'];
  }
  
  const [name, setName] = useState(n ?? '');
  const [salary, setSalary] = useState(s ?? 0);
  const [department, setDepartment] = useState(d ?? '');
  console.log(name, salary, department, id)

  let [createNewEmployee] = useCreateNewEmployeeMutation();
  let [modifyEmployee] = useModifyEmployeeMutation();
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation
  const handleSave = async() => {
      const newEmployee: Employee = {...employee, name, salary, department };
      if (!validateInput(newEmployee))
        return;
      console.log("is id null?", id === null)
      if (id !== null){
        newEmployee.id = id
        let result = await modifyEmployee(newEmployee);
        if (result.data?.status === "success"){
          alert("Success!")
          navigate("/")
          return;
        }
        else{
          alert(JSON.stringify(result.error))
          return
        }
      }
      else{
        let result = await createNewEmployee(newEmployee);
        if (result.data?.status === "success"){
          alert("Success!")
          navigate("/")
          return;
        }
        else{
          alert(JSON.stringify(result.error))
          return
        }
      }
  };

  return (
      <div className="create-employee">
          <Link to="/">Click me to go back</Link>
          <h2>Create Employee</h2>
          <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                  <label>Name:</label>
                  <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <label>Salary:</label>
                  <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                  />
              </div>
              <div className="form-group">
                  <label>Department:</label>
                  <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                  />
              </div>
              <button type="button" onClick={handleSave}>
                  Save
              </button>
          </form>
      </div>
  );
};

export default CreateEmployee