import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/Store'
import { selectEmployees, EmployeeReducer, updateEmployees } from './store/slices/EmployeesSlice'
import EmployeeItem from './components/EmployeeItem'
import "./App.css"
import Navbar from './components/Navbar'
import { useGetAllEmployeesQuery, useGetEmployeeWindowQuery } from './store/EmployeesApi'
import PageHandler from './components/PageHandler'
import AlertDialog from './components/AlertDIalog'

const App = () => {
  const pageState = useState(0);
  const { data: employees, error, isLoading } = useGetEmployeeWindowQuery({pageNumber:pageState[0], windowSize:10});
  // let { data: employees, error, isLoading, refetch } = useGetAllEmployeesQuery();
  // const employees_state = useSelector(selectEmployees)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if (employees){
      dispatch(updateEmployees(employees.employees))
    }
  },[employees,dispatch])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  console.log(employees)
  return (
    <div className='apply-blur' id='backdrop'>
      <div className='apply-bg'>
      <Navbar/>
        <div className='employees-grid'>
          {employees?.employees?.map((emp, idx) => <EmployeeItem employee={emp} key={idx} />)}
        </div>
        <PageHandler pageNumber={pageState[0]+1} totalEntries={employees?.totalEmployees} start={employees?.totalEmployees-10*(pageState[0]+1)} end={employees?.totalEmployees} />
        <AlertDialog/>
      </div>
    </div>
  )
}

export default App