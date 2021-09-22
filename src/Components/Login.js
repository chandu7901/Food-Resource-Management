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
import Vector from "../Assets/Singupvec.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
const url = "/api/auth"; 

function Login() {
  let defaultVal=localStorage.getItem("token");
  if(defaultVal)
  defaultVal=true;
  else
  defaultVal=false;
  const [loggedIn, setLoggedIn] = useState(defaultVal);
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
    if (details.email && details.password) {
      axios
        .post(`${url}`, details)
        .then((res) => {

          console.log(res);
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
     
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
      <h1 className="head">
        Contribute to <br /> the cause
      </h1>
      <img src={Vector} alt="image" className="vec1" />
      <div className="login">
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
            <Link to="/Signup" style={{ color: "#142850" }}>
              Signup
            </Link>
          </span>
        </p>
      </div>
      {loggedIn && <Redirect to="/userfood" />}
    </div>
  );
}

export default Login;
