import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Employee,  } from '../store/types/Employee'
import "./styles/CreateEmployee.css"
import { useCreateNewEmployeeMutation, useModifyEmployeeMutation } from '../store/EmployeesApi'
import { Box, Button, FormControl, Input, MenuItem, Select, Typography } from '@mui/material'

interface CreateEmployeeProps {
  employee?: Employee;
}


const CreateEmployee: React.FC<CreateEmployeeProps> = () => {
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

  // use location hook sees where it has navigated from, then reads the state fed into it
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
  const navigate = useNavigate(); // useNavigate hook for navigation


  const handleSave = async() => {
      const newEmployee: Employee = {name:name, salary:salary, department:department };
      console.log(department)
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
      <Box className="create-employee">
          {/* navigate back button */}
          <Button variant="contained" onClick={()=>navigate("/")} sx={{backgroundColor:"red"}}> Go Back </Button>
          <Typography sx={{color:"#030303", fontSize:"1.5em", fontWeight:"bold"}}>Create Employee</Typography>
          {/* form start */}
          <FormControl onSubmit={(e) => e.preventDefault()}>
              {/* Name input */}
              <Box className="form-group">
                  <Typography sx={{color:"#030303", fontWeight:"bold"}}>Name:</Typography>
                  <Input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
              </Box>
              {/* Salary Input */}
              <Box className="form-group">
                  <Typography sx={{color:"#030303", fontWeight:"bold"}}>Salary:</Typography>
                  <Input 
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                  />
              </Box>
              {/* Department Input */}
              <Box className="form-group">
                  <Typography sx={{color:"#030303", fontWeight:"bold"}}>Department:</Typography>
                  <Select fullWidth name="department" value={department} onChange={(e)=>setDepartment(e.target.value)}>
                    <MenuItem value={""}></MenuItem>
                    <MenuItem value={"HR"}>HR</MenuItem>
                    <MenuItem value={"PS"}>PS</MenuItem>
                  </Select>
              </Box>
              {/* Submission */}
              <Button variant="contained" onClick={handleSave} sx={{backgroundColor:"green"}}>
                Save
              </Button>
          </FormControl>
      </Box>
  );
};

export default CreateEmployee