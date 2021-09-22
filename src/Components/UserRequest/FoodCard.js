import "./UserRequest.css";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

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

const Food = ({finalState,type,time}) => {
const [ buttonstyle, Setstyle ] = useState(false);
const [ btnstyle, Setbtnstyle ] = useState(false);
//  const [status,setStatus]=useState(true);

  
  return (
     
      <div className="food-box">
        <div id="food_card_headding">
          <span>
            <b>{type}</b>
          </span>
        </div>
        <div id="date_time">
          <span>{getCurrentDate()}</span>
          <span>{time}</span>
         
        </div>
        <div id="Description">
          {/* <span id='description_note'>Note</span> */}
          <p>
            Click submit if are not attending for {type} ,   once you click submit
            button the decision cannot be reverted back.
          </p>
        </div>
        <button disabled={buttonstyle}  className={btnstyle ? "btn_dis" : "button_raise"} type="button" onClick={()=>{
          finalState(false)
          alert('Click submit to confirm')
          Setstyle(true);
          Setbtnstyle(!btnstyle);
        }}
          >
          I am not attending
        </button>
        
      </div>
    
 
  );
};

export default Food;
