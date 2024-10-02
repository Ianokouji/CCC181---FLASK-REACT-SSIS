/**
 * Navbar Component
 * 
 * This component renders the navigation bar for the application. 
 * It contains links or buttons for navigating to different sections of the SSIS.
 * 
 * */

import { Link } from "react-router-dom";
import { FaHome, FaUserGraduate, FaSchool, FaRegAddressCard } from 'react-icons/fa';


function Navbar() {
  return (
    <div className="navbar-component">
      <Link to='/api/colleges' className='nav-link'>
        <FaSchool /> Colleges
      </Link>
      <Link to='/api/programs' className='nav-link'>
        <FaRegAddressCard /> Programs
      </Link>
      <Link to='/api/students' className='nav-link'>
        <FaUserGraduate /> Students 
      </Link>
      <Link to='http://localhost:5173' className='nav-link'>
        <FaHome /> Home 
      </Link>
    </div>
  );
}

export default Navbar;