import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Food from "./FoodCard";
import Navbar from "./Navbar";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";



function App() {

  useEffect(async ()=>{
    const data=await axios.get("/api/responses",{
      headers:{
        "user_tok":localStorage.getItem("token")
      }
    })
    // console.log(data)
  })
  function getCurrentDate() {
    var separator = "-";
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  }
 // const [parentState,setParent]=useState(true)
  const [user,setUser]=useState('');
  const [lunchStat,setLunch]=useState(true)
  const [dinnerStat,setDinner]=useState(true)
  const handleSubmit=(e)=>{
     e.preventDefault();
    console.log(`lunch : ${lunchStat}`);
    console.log(`dinner : ${dinnerStat}`);
    const data={
      lunch:lunchStat,
      dinner:dinnerStat,
      date:getCurrentDate()
    }
    const config={ 
      headers: {
      "X-Auth-Token": `${localStorage.getItem('token')}`,
      "content-type": "application/json"
  }}
    axios.post('/api/responses',data,config).then(()=>{
      alert("Succesfully submitted ")
    })
   .catch((err)=>{
     alert("Server error , try again")
     console.log(err)
   })
  }
  return (
 
      <div className="App">

      { localStorage.getItem('token') ?
      <div>
      <form onSubmit={handleSubmit}> 
        <Navbar/>
        <Food type='Lunch' time=' - 12pm' finalState={status=>setLunch(status)}/>
        <br></br>
        <Food type='Dinner' time=' - 7pm' finalState={status=>setDinner(status)}/>
        <button type="submit" style={{position:'absolute',marginLeft:'45%',marginTop:'0px'}}>Submit</button>
   <br/>
        </form> 
        {/* {console.log(localStorage.getItem('token').name)} */}
        <br/>
        <br/>
        </div>: <div style={{textAlign:'center',marginTop:'20%'}}> 
          <h2>Please  <Link to="/login"><span style={{color:'black'}}>login</span></Link> to continue</h2>
          </div>}
      </div>
    

  );
}

export default App;
