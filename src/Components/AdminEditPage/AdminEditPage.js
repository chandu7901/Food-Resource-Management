import "./AdminEditPage.css";
import Navbar from "../AdminAbsenceView/NavbarAdmin";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import axios from 'axios'

//const initialListLunch = ['idly','sambar'];
//const initialListDinner = ['Chapathi','Parotta'];
// function getCurrentDate() {
//   var separator = "-";
//   let newDate = new Date();
//   let date = newDate.getDate();
//   let month = newDate.getMonth() + 1;
//   let year = newDate.getFullYear();

//   return `${date}${separator}${
//     month < 10 ? `0${month}` : `${month}`
//   }${separator}${year}`;
// }

const AdminEditPage = () => {
  const getDay = () => {
    let d = new Date();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let n = weekday[d.getDay()];
    return n;
  };
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
  const [itemsLunch, setItemsLunch] = useState([]);
  const [itemLunch, setItemLunch] = useState();
  const handleSubmitLunch = (e) => {
    e.preventDefault();
    setItemsLunch([...itemsLunch, itemLunch]);
    setItemLunch("");
  };
  const [ TotalFood, SetTotalFood ] = useState(0);
  const [itemsDinner, setItemsDinner] = useState([]);
  const [itemDinner, setItemDinner] = useState();
  const handleSubmitDinner = (e) => {
    e.preventDefault();
    setItemsDinner([...itemsDinner, itemDinner]);
    setItemDinner("");
  };
  const removeItemLunch = (newitemLunch) => {
    const newitemsLunch = itemsLunch.filter(
      (itemLunch) => itemLunch !== newitemLunch
    );
    //console.log(newitems);
    // console.log(newitemLunch);
    setItemsLunch(newitemsLunch);
  };
  const removeItemDinner = (newitemDinner) => {
    const newitemsDinner = itemsDinner.filter(
      (itemDinner) => itemDinner !== newitemDinner
    );
    //console.log(newitems);
    // console.log(newitemDinner);
    setItemsDinner(newitemsDinner);
  };
  const handleSubmit = async () => {
    const data = {
      dinnerList: itemsDinner,
      lunchList: itemsLunch,
      foodcooked: TotalFood,
      date: getCurrentDate()
    }; 
    const token=localStorage.getItem('admintoken')
    // console.log(token)
    try{

      const config={
        headers:{
          'Content-type':'application/json',
          "x-auth-token" : `${token}`
        }
      }
      // const body =JSON.stringify(newUser)
      const res= await axios.post('/api/admin/addtimetable',data,config)  
      // setSignedUp(true)
     if(res.data.lunchList)
     {
       alert("Saved succesfully")
     }
     else{
        alert("Server error , try again")
     }

    }
    catch(err)
    {
    console.log(err)
    }
    // console.log(data)
  }
  return (
    <div>
      <Navbar />
      <br />
      <h2
        style={{
          position: "relative",
          left: "35%",
          width: "500px",
          color: "#263238",
        }}
      >
        Menu items
      </h2>
      <div id="Date_Time">
        <p>
          <br></br>
          <br></br>
          <b>
            {getCurrentDate()}<br></br>
            <br></br>
            {getDay()}
          </b>
        </p>
      </div>
      <div id="Note_div">
        <p>
          <h3>Note</h3>
          <br></br>
          <b>The menu will be shown 4 hours prior on the day of the cooking</b>
        </p>
      </div>
      <div className="TimeTable">
        <div className="Menu_Items">
          <div className="Lunch_content">
            <span>
              <b>Lunch:-</b>
            </span>
            <div className="content">
              <form>
                <input
                  class="field__input"
                  type="text"
                  required
                  value={itemLunch}
                  onChange={(e) => {
                    setItemLunch(e.target.value);
                  }}
                />
                <button
                  onClick={handleSubmitLunch}
                  className="button_add"
                  type="submit"
                >
                  Add
                </button>
              </form>
              {itemsLunch.map((newitemLunch,index) => {
                return (
                  <li className="display_list" key={index}>
                    <h4>{newitemLunch}</h4>
                    <button
                      className="delete_btn"
                      onClick={(e) => removeItemLunch(newitemLunch)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="Dinner_content">
            <span>
              <b>Dinner:-</b>
            </span>
            <div className="content">
              <form onSubmit={handleSubmitDinner}>
                <input
                  class="field__input"
                  type="text"
                  value={itemDinner}
                  onChange={(e) => {
                    setItemDinner(e.target.value);
                  }}
                />
                <button className="button_add" type="submit">
                  Add
                </button>
              </form>
              {itemsDinner.map((newitemDinner,index) => {
                return (
                  <li className="display_list" key={index}>
                    <h4>{newitemDinner}</h4>
                    <button
                      className="delete_btn"
                      onClick={(e) => removeItemDinner(newitemDinner)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br />
        <h2 style={{ position: "relative", left: "32%", width: "500px" }}>
          Update Food Cooked
        </h2>
        <div className="food_wastage_update">
          <span>
            <b>Food Cooked:-</b>
          </span>
          <div className="content">
            
              <input onChange={(e) => {SetTotalFood(e.target.value)}}
                class="field__input"
                type="text"
                placeholder="Enter Amount in Kgs"
              ></input>
            
          </div>
        </div>
        <button onClick={handleSubmit} className="save_btn">SAVE</button>
      </div>
    </div>
  );
};

export default AdminEditPage;
