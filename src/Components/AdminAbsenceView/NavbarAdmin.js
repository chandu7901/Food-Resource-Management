import { Link } from 'react-router-dom';
import './AdminAbsenceView.css'

const NavbarAdmin = () =>{
  return (
    <div className = 'navbarAdmin'>
       <button onClick={()=>{
        localStorage.clear();
      }}><Link to="/AdminLogin" style={{color:'white',textDecoration:'none',fontSize:'18px'}}> logout</Link></button>
      <a className='nav-contentsAdmin' href="/TimetableEdit">Menu items</a>
      <a className='nav-contentsAdmin' href="/SecondEdit">Upadate wastage</a>
      <a className='nav-contentsAdmin' href="/AdminAbsenceView">Absence view</a>
      <a className='nav-contentsAdmin' href="/AdminDashboard">Home</a>
      
    </div>
  );  
}


export default NavbarAdmin;