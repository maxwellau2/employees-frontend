import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Employee } from '../store/types/Employee'
import "./styles/CreateEmployee.css"

interface CreateEmployeeProps {
  employee?: Employee;
}

const CreateEmployee: React.FC<CreateEmployeeProps> = ({ employee }) => {
  const [name, setName] = useState(employee?.name || '');
  const [salary, setSalary] = useState(employee?.salary || 0);
  const [department, setDepartment] = useState(employee?.department || '');

  const handleSave = () => {
      const newEmployee: Employee = { name, salary, department };
      alert(JSON.stringify(newEmployee, null, 2));
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