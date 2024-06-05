import { Alert, Box } from '@mui/material'

const ShowError = () => {
  // Could be more sphisticated, but this will suffice for now
  return (
    <Box>
      <Alert severity="warning">Something went wrong...</Alert>
    </Box>
  )
}

export default ShowError