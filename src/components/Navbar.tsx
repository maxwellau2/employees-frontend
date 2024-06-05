import './styles//Navbar.css';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Button, Input, Stack, Typography } from '@mui/material';

// interface NavbarProps {
//     onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     onCreateEmployee: () => void;
// }


const Navbar = () => {
    
    const navigate = useNavigate();
    function onFilterChange(){
        return;
    }
    
    function onCreateEmployee(){
        navigate("/CreateNewEmployee", {state:{id:null, name:"", salary:0, department:""}})
        return ;
    }
    return (
        <Stack direction={"row"} className="navbar"> {/* top blue bar, row stack */}
            <Typography variant='h4' className="navbar-title">Employee Management</Typography>
            {/* filtering employees */}
            <Input 
                sx={{backgroundColor: "white", width: "400px"}}
                type="text" 
                className="navbar-input" 
                placeholder="Filter employees..." 
                onChange={onFilterChange} 
            />
            {/* create employee btn */}
            <Button variant="contained" onClick={onCreateEmployee} startIcon={<AddIcon/>} sx={{backgroundColor:"green"}}>
                Create Employee
            </Button>
        </Stack>
    );
}

export default Navbar;
