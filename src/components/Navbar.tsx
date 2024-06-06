import './styles//Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from './reusable-components/IconButton';

// interface NavbarProps {
//     onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     onCreateEmployee: () => void;
// }


const Navbar = () => {
    
    const navigate = useNavigate();
    // function onFilterChange(){
    //     return;
    // }
    
    function onCreateEmployee(){
        navigate("/CreateNewEmployee", {state:{id:null, name:"", salary:0, department:""}})
        return ;
    }
    return (
        <Stack direction={"row"} className="navbar"> {/* top blue bar, row stack */}
            <Typography variant='h4' sx={{"fontWeight" : "bold"}} className="navbar-title">Employees</Typography>

            {/* filtering employees */}

            {/* <Input 
                sx={{backgroundColor: "white", width: "400px"}}
                type="text" 
                className="navbar-input" 
                placeholder="Filter employees..." 
                onChange={onFilterChange} 
            /> */}

            {/* create employee btn */}
            <IconButton icon={<AddCircleOutlineIcon/>} text='Create Employee' onClick={onCreateEmployee}/>
        </Stack>
    );
}

export default Navbar;
