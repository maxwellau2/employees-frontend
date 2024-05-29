import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Employee,  } from '../store/types/Employee'
import "./styles/CreateEmployee.css"
import { useCreateNewEmployeeMutation } from '../store/EmployeesApi'

interface CreateEmployeeProps {
  employee?: Employee;
}

const CreateEmployee: React.FC<CreateEmployeeProps> = ({ employee }) => {
  const [name, setName] = useState(employee?.name || '');
  const [salary, setSalary] = useState(employee?.salary || 0);
  const [department, setDepartment] = useState(employee?.department || '');
  let [createNewEmployee] = useCreateNewEmployeeMutation();
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation
  const handleSave = async() => {
      const newEmployee: Employee = {...employee, name, salary, department };
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