import { Link } from 'react-router-dom'
import './UserRequest.css'

const Navbar = () =>{
  return (
    <div className = 'navbar'>
       <button onClick={()=>{
        localStorage.clear();
      }}><Link to="/login" style={{color:'white',textDecoration:'none',fontSize:'18px'}}> logout</Link></button>
      <a className='nav-contents' href="/UserProfile">Profile</a>
      <a className='nav-contents' href="/userfood">Request</a>
      <a className='nav-contents' href="/UserItemsView">Home</a>
      
    </div>
  );  
}


export default Navbar;