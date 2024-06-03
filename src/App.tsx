import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/Store'
import { selectEmployees, EmployeeReducer, updateEmployees } from './store/slices/EmployeesSlice'
import EmployeeItem from './components/EmployeeItem'
import "./App.css"
import Navbar from './components/Navbar'
import { useGetEmployeeWindowQuery } from './store/EmployeesApi'
import PageHandler from './components/PageHandler'
import AlertDialog from './components/AlertDIalog'

const App = () => {
  const pageState = useState(0);
  const window_size = 10
  const { data: employees, error, isLoading } = useGetEmployeeWindowQuery({pageNumber:pageState[0], windowSize:window_size});

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {String(error)}</div>;
  console.log(employees)
  return (
    <div className='apply-blur' id='backdrop'>
      <div className='apply-bg'>
      <Navbar/>
        <div className='employees-grid'>
          { employees? employees!.employees?.map((emp, idx) => <EmployeeItem employee={emp} key={idx}/>) : "No employees" }
        </div>
        {/* for page handler, i use prop drilling because we dont need the state elsewhere */}
        <PageHandler pageNumber={pageState[0]+1} 
          totalEntries={employees!.totalEmployees}
          start={window_size*(pageState[0])}
          end={employees!.employees.length + window_size*(pageState[0])}
          state={pageState} />
        <AlertDialog/>
      </div>
    </div>
  )
}

export default App