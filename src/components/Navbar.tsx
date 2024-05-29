import React from 'react';
import './styles//Navbar.css';
import { Link } from 'react-router-dom';

// interface NavbarProps {
//     onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     onCreateEmployee: () => void;
// }

function onFilterChange(){
    return;
}

function onCreateEmployee(){
    // alert("ur mom")
    return ;
}

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Employee Management</h1>
            <input 
                type="text" 
                className="navbar-input" 
                placeholder="Filter employees..." 
                onChange={onFilterChange} 
            />
            <Link to={'/CreateNewEmployee'}>
                <button className="navbar-button" onClick={onCreateEmployee}>Create Employee</button>
            </Link>
        </nav>
    );
}

export default Navbar;
