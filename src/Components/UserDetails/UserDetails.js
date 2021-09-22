import { useState } from 'react/cjs/react.development';
import './UserDetails.css'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function AdminDetails() {

  const url="/api/admin/auth";
  const [serviceName,setServiceName]=useState("")
  const [totalConsumers,setTotal]=useState(0)
  const [loggedIn,setLoggedIn]=useState(false)

  const handleSubmit= async (e)=>{
    e.preventDefault()
    if(serviceName && totalConsumers)
    {

      const email=localStorage.getItem("email")
      const password=localStorage.getItem("password")
      const result1= await axios.post(`${url}`,{email,password})
      localStorage.setItem("admintoken", result1.data.token);
        try{
    
          const config={
            headers:{
              'Content-type':'application/json',
              "x-auth-token" : `${result1.data.token}`
            }
          }
          const finalResult= await axios.post('/api/admin/addDetails',{serviceName,totalConsumers},config)
         setLoggedIn(true)
    
        }
        catch(err)
        {
        console.log(err)
        }
   
    }
    else
    {
      alert("Fill all the fields")
    }
  }
  return (
    <form onSubmit={handleSubmit}>
    <div className="context_main">
        <h1 style={{position: "absolute", top: "-15%", color: "#142850", marginLeft: "17%", fontWeight: "bolder", fontSize: "250%"}}>Details</h1>
        <label className="LABEL">Service Provider Name</label><br></br><br></br>
        <input className="input_main"
        value={serviceName}
        onChange={(e)=>{
          setServiceName(e.target.value)
        }}
         placeholder="Ex:- Satya Dev Food Services"></input><br></br><br></br><br></br><br></br><br></br>
        <label className="LABEL">Total Number of Consumers</label><br></br><br></br>
        <input className="input_main" 
        value={totalConsumers}
        onChange={(e)=>{
              setTotal(e.target.value)
        }}
        placeholder="Ex:- 389"></input>
        <br/>
        <br/>
       
    </div>
 
    <button type="submit" style={{position:'relative',left:'-47%',marginTop:'-2%',color:'white'}}>
    
      Next
     
      </button>
      {loggedIn && <Redirect to="/AdminDashboard"/>}
    </form>
  );
}

export default AdminDetails;
