import './SecondEdit.css';
import Navbar from "../AdminAbsenceView/NavbarAdmin";
import axios from 'axios'
import { useState } from 'react/cjs/react.development';

const SecondEdit = () =>{
  const [ foodwaste, Setfoodwaste ] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(foodwaste)
    // add post route here
    const token=localStorage.getItem('admintoken')
    // console.log(token)
    try{

      const config={
        headers:{
          'Content-type':'application/json',
          "x-auth-token" : `${token}`
        }
      }
   
      const res= await axios.post('/api/admin/wastage',{wastage:foodwaste},config)  
      alert("Updated successfully")
 

    }
    catch(err)
    {
    console.log(err)
    }
  }
  return (
    <div>
        <Navbar/>
        
        <h1 style={{marginLeft: "37%", marginTop: "10%"}}>Update Food Wastage</h1>
        <div className="food_wastage_update_new">
            <span>
            <b>Food Wastage:-</b>
          </span>
          <div className="content_new">
            <form onSubmit={handleSubmit}>
              <input onChange={ (e) => {
                Setfoodwaste(e.target.value);
              }} class="field__input_new" type="number" min="0" placeholder="Enter Amount in Kgs"></input>
              <button type="submit" className='save_btn_new'>SAVE</button>
            </form>
          </div>
        </div>
        
    </div>
  );
}


export default SecondEdit;