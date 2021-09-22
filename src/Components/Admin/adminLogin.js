import React, { useEffect, useState } from "react";
import axios from "axios";
// checking push
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Vector from '../../Assets/adminloginandsignup.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
const url="/api/admin/auth"


function AdminLogin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(details);
    if (details.email && details.password) {
      axios
        .post(`${url}`, details)
        .then((res) => {
         
          console.log(res.data);
          if (res.data.token) {
            localStorage.setItem("admintoken", res.data.token);
            setLoggedIn(true);
          }
          else{
            alert(res.data.msg)
            setDetails({email:"",password:""})
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    };
  return (
    <div className="mainlogin">
      <h1 style={{color: "#142850", fontSize: "330%", marginLeft: "10%", marginTop: "3%"}}>Manage<br></br>Resources</h1>
      <h1 style={{color: "#3498db", marginLeft: "10%"}}>Everything at one place</h1>
      <img style={{position: "relative", left: "10%", marginTop: "3%"}} src={Vector}></img>
      <div style={{top: "-60px"}} className="login">
        <h1 style={{ textAlign: "center", position: "relative", top: "50px" }}>
          <u>Login</u>
        </h1>
        <p
          style={{
            textAlign: "center",
            position: "relative",
            top: "70px",
            fontWeight: "600",
          }}
        >
          Login to your account
        </p>
        <br />
        <form className="inputs" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={details.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            value={details.password}
          />
          <button className="buttons btnsgn" type="submit">
            Login <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            position: "relative",
            bottom: "-180px",
            left: "80px",
          }}
        >
          Don't have an account ?{" "}
          <span>
            {" "}
            <a href="/AdminSignup" style={{ color: "#142850" }}>
              Signup
            </a>
          </span>
        </p>
        </div>
        {loggedIn && <Redirect to="/AdminDashboard" />}
        </div>
  );
}

export default AdminLogin;
