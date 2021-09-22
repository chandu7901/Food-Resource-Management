import { React, useState } from "react";
import Signupvec from '../Assets/Singupvec.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";


import {
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";



function Signup() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    emailID: "",
    password: "",
    confirmPassword: "",
  });
 const [signedup,setSignedUp]=useState(false)

  const handleChange = (e) => {
    // e.preverntDefault();
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
      const res= await axios.post('/api/users',body,config)  
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
      <h1 className="head">Contribute to <br/> the cause
      
      </h1>
      
      <img src={Signupvec} alt="image" className="signvec" />
      <div className="signin">
        <h1 style={{ textAlign: "center", position: "relative", top: "50px" }}>
          <u>Signup</u>
          
        </h1>
        <br/>
        <p
          style={{
            textAlign: "center",
            position: "relative",
            top: "70px",
            fontWeight: "600",
          }}
        >
          Enter your details to create a free account
        </p>

        <form className="inputs signinp" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder=" First Name"
              onChange={handleChange}
              value={values.firstName}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder=" Last Name"
              onChange={handleChange}
              value={values.lastName}
              required
            />
          </div>

          <input
            type="email"
            name="emailID"
            placeholder=" Email"
            style={{ width: "425px" }}
            onChange={handleChange}
            value={values.emailID}
            required
          />
          <input
            type="password"
            name="password"
            placeholder=" Password"
            style={{ width: "425px" }}
            onChange={handleChange}
            value={values.password}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder=" Confirm Password"
            style={{ width: "425px" }}
            onChange={handleChange}
            value={values.confirmPassword}
            required
          />

          <button className="buttons btnsgnfinal" type="submit">
            Sign up <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            position: "relative",
            bottom: "-160px",
            left:"80px"
          }}
          
        >
          Already have an account ?{" "}
          <span>
            <Link to="/login" style={{ color: "#142850" }}>
              Login
            </Link>
          </span>
        </p>
      </div>
      {signedup && <Redirect to="/login"></Redirect>}
    </div>
  );
}

export default Signup;
