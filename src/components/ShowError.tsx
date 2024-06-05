import { Alert, Box } from '@mui/material'

interface IShowError{
  errorMessage : string;
}

const ShowError = (prop: IShowError) => {
  // Could be more sphisticated, but this will suffice for now
  return (
    <Box>
      <Alert severity="warning">{prop.errorMessage}</Alert>
    </Box>
  )
}

export default ShowError