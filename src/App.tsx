import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/Store'
import { Employee, selectEmployees, EmployeeReducer, updateEmployees } from './store/slices/EmployeesSlice'
import EmployeeItem from './components/EmployeeItem'
import "./App.css"
import Navbar from './components/Navbar'
import { EmployeesClient } from './utils/EmployeesClient'
import { useGetAllEmployeesQuery, useGetEmployeeWindowQuery } from './store/EmployeesApi'

const client = new EmployeesClient()

const App = () => {
  // const dispatch = useDispatch()
  // const employees = useSelector(selectEmployees)
  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //       try {
  //           let employees_data = await client.GetAllEmployees();
  //           console.log(employees_data)
  //           if (employees_data.statusCode == 200){
  //             dispatch(updateEmployees(employees_data.data));
  //           }
  //           else{
  //             console.log(employees_data.statusCode, employees_data.data)
  //           }
  //       } catch (error) {
  //           console.error('Failed to fetch employees', error);
  //       }
  //   };

  //   fetchEmployees();
  // }, [dispatch]);
  const { data: employees, error, isLoading } = useGetEmployeeWindowQuery({start:1, windowSize:5});//
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.status}</div>;
  console.log(employees)
  return (
    <div className='apply-bg'>
      <Navbar/>
      <div className='employees-grid'>
        {employees?.map((emp, idx) => <EmployeeItem employee={emp} key={idx} />)}
      </div>
    </div>
  )
}

export default App