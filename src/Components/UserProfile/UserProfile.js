import './UserProfile.css'
import Navbar from "../UserRequest/Navbar";
import vect from '../../Assets/humanFace.svg'
import { useState } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import axios from 'axios';
import { useEffect } from 'react';



const UserProfile = () =>{

  const [ info, Setinfo] = useState({
    User_name : "Tori Vega",
    Email : "tori@gmail.com",
    Enrolled_food_court : "Satya Dev Food Services",
    Vaild_date : "29-02-2023",
    Contribution : 9
})

  useEffect(async()=>{
    const {data}=await axios.get("/api/profile",{
      headers:{
        "x-auth-token":localStorage.getItem("token")
      }
    })
    const data1=await axios.get("/api/admin/addDetails");
    Setinfo({...info,User_name:data.user.name,Email:data.user.email,Contribution:data.contributions,Enrolled_food_court:data1.data.messName})
    console.log(data1);
},[])
    
const data = [
  {
    name: 'Jan',
    Contribution: 7,
  },
  {
    name: 'Feb',
    Contribution: 5,
  },
  {
    name: 'Mar',
    Contribution: 6,
  },
  {
    name: 'Apr',
    Contribution: 15,
  },
  {
    name: 'May',
    Contribution: 17,
  },
  {
    name: 'June',
    Contribution: 3,
  },
];

  return (
    <div>
        { localStorage.getItem('token') ?
        <div>
        <Navbar/>

        <div id="Profile">
            <br></br>
            <br></br>
            <h1 style={{marginLeft: "25%"}}>Profile Information</h1>
            <br></br>
            <img id="profile_pic" src={vect} width="200" height="200"></img>
            <div id="User_info">
                <b>
                    <span>Name:-</span>
                    <br></br>
                    <br></br>
                    <span>Email:-</span>
                    <br></br>
                    <br></br>
                    <span>Enrolled Food Court:-</span>
                    <br></br>
                    <br></br>
                    <span>Valid Till:-</span>
                    <br></br>
                    <br></br>
                    <span style={{color: "#3598DC"}}>{info.User_name}</span>
                    <br></br>
                    <br></br>
                    <span style={{color: "#3598DC"}}>{info.Email}</span>
                    <br></br>
                    <br></br>
                    <span style={{color: "#3598DC"}}>{info.Enrolled_food_court}</span>
                    <br></br>
                    <br></br>
                    <span style={{color: "#3598DC"}}>{info.Vaild_date}</span>
                </b>
            </div>

        </div>
        <div className="stats">
            <br></br>
            <br></br>
            <h1 style={{marginLeft: "35%"}}>Contributions</h1>
            <div className="Statistics">
                <BarChart
                    width={400}
                    height={200}
                    data={data}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                    }}
                    barSize={40}
                >
                    <XAxis dataKey="name" scale="point"   padding={{ left: 10, right: 10 }} />
                    {/* <YAxis /> */}
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <Bar dataKey="Contribution" fill="#3498db"  />
                </BarChart>
            </div>
            <h1 style={{color: 'black', marginLeft: "25%", marginTop: "3%"}}>Highest Contribution</h1>
            <br></br>
            <div id="Number"><b>{info.Contribution}</b></div>
        </div>

        </div>: <div style={{textAlign:'center',marginTop:'20%'}}> 
          <h2>Please  <Link to="/login">login</Link> to continue</h2>
          </div>}

    </div>
  );
}


export default UserProfile;