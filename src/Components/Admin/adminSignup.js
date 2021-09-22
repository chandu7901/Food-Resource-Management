import React, { useEffect, useState } from "react";
import './AdminSignup.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import vector from '../../Assets/adminloginandsignup.svg'
import AdminDetails from '../UserDetails/UserDetails'


import {
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";


function AdminSignup() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    emailID: "",
    password: "",
    confirmPassword: "",
  });
 const [signedup,setSignedUp]=useState(false)

  const handleChange = (e) => {
    const inpname = e.target.name;
    const inpvalue = e.target.value;
    setValues({ ...values, [inpname]: inpvalue });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.firstName.length < 5) {
      alert("Less characters in firstname (minimum length 6)");
      setValues({ ...values, firstName: "" });
      return;
    }
    if (values.password !== values.confirmPassword) {
      alert("Password and confirm password do not match");
      setValues({ ...values, password: "", confirmPassword: "" });
      return;
    }
    console.log('success')
    const {firstName,lastName,password,emailID}=values
    const name=firstName+(lastName?lastName:" ")
    const email=emailID
    const newUser={
      name,email,password
    }
    try{

      const config={
        headers:{
          'Content-type':'application/json'
        }
      }
      const body =JSON.stringify(newUser)
      localStorage.setItem("email",email)
      localStorage.setItem("password",password)
      const res= await axios.post('/api/admin/users',body,config)  
      setSignedUp(true)
    //  console.log(res.data.errors)

    }
    catch(err)
    {
    console.log(err)
    }

    setValues({
      firstName: "",
      lastName: "",
      emailID: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div>
      <h1 style={{color: "#142850", fontSize: "330%", marginLeft: "10%", marginTop: "3%"}}>Manage<br></br>Resources</h1>
      <h1 style={{color: "#3498db", marginLeft: "10%"}}>Everything at one place</h1>
      <img style={{position: "relative", left: "10%", marginTop: "5%"}} src={vector}></img>
      <div className="main_content_login">
        <h1 style={{marginTop: "30px"}}><u>Signup</u></h1>
        <p style={{marginTop: "30px"}}><b>Enter your details to create a free account</b></p>
        <form onSubmit={handleSubmit}>
          <input className="inputs_Admin_Signup first_set" name="firstName" placeholder ="First Name" value={values.firstName} onChange={handleChange} required></input>
          <input className="inputs_Admin_Signup first_set" name="lastName" placeholder="Last Name" value={values.lastName} onChange={handleChange} required></input>
          <input type="email" className="inputs_Admin_Signup second_set" name="emailID" placeholder="Email" onChange={handleChange} value={values.emailID} required></input>
          <input type="password" className="inputs_Admin_Signup second_set" name="password" placeholder="Password" onChange={handleChange} value={values.password} required></input>
          <input type="password" className="inputs_Admin_Signup second_set" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={values.confirmPassword} required></input> 
          <button style={{position: "relative", left: "-30%", width: "200px"}}>Submit <FontAwesomeIcon icon={faSignInAlt} /></button>
          <p
          style={{
            textAlign: "center",
            position: "absolute",
            top: "92%",
            marginLeft:"155px",
            width: "300px"
          }}
          
        >
          Already have an account ?{" "}
          <span>
            <a href="/AdminLogin" style={{ color: "white" }}>
              Login
            </a>
          </span>
        </p>
        </form>
    </div>
    {signedup && <Redirect to="/AdminDetails"/>}
    </div>
  );
}

export default AdminSignup;
