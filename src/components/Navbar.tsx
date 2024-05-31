import React from 'react';
import './styles//Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

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
        // alert("ur mom")
        navigate("/CreateNewEmployee", {state:{id:null, name:"", salary:0, department:""}})
        return ;
    }
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Employee Management</h1>
            <input 
                type="text" 
                className="navbar-input" 
                placeholder="Filter employees..." 
                onChange={onFilterChange} 
            />
            <button className="navbar-button" onClick={onCreateEmployee}>Create Employee</button>
        </nav>
    );
}

export default Navbar;
