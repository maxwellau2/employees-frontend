import EmployeeItem from './components/EmployeeItem'
import "./App.css"
import Navbar from './components/Navbar'
import { useGetEmployeeWindowQuery } from './store/EmployeesApi'
import PageHandler from './components/PageHandler'
import ShowError from './components/ShowError'
import { useState } from 'react'
import { Box } from '@mui/material'

const App = () => {
  const pageState = useState(0);
  const window_size = 10
  const { data: employees, error, isLoading } = useGetEmployeeWindowQuery({pageNumber:pageState[0], windowSize:window_size});

  if (isLoading) return <Box>Loading...</Box>;
  // if (error) return <Box>Error: {String(error)}</Box>;
  console.log(employees)
  return (
    <Box className='apply-blur'>
      <Box className='apply-bg'>
      <Navbar/>
        <Box className='employees-grid'>
          { error? <ShowError/> :employees!.employees?.map((emp, idx) => <EmployeeItem employee={emp} key={idx}/>)}
        </Box>
        {/* for page handler, i use prop drilling because we dont need the state elsewhere */}
        {error? <Box>No pages</Box>:

        <PageHandler pageNumber={pageState[0]+1} 
          totalEntries={employees!.totalEmployees}
          start={window_size*(pageState[0])}
          end={employees!.employees.length + window_size*(pageState[0])}
          state={pageState} />
        }
      </Box>
    </Box>
  )
}

export default App