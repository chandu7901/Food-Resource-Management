import "./UserItemsView.css";
import Navbar from "../UserRequest/Navbar";
import { useState } from "react/cjs/react.development";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const UserItemsView = () => {
const [lunch,setLunch]=useState(["Brinjal Curry","Panner Dum Briyani", "Papads","Sambar"])
const [dinner,setDinner]=useState(["Panner Butter Masala","Butter Naan","Dosa"])
const [wastage,setWastage]=useState(0)

  useEffect(async () => {
    const data = await axios.get("/api/admin/addtimetable");
    const data1= await axios.get("/api/admin/wastage");
    setLunch(data.data.lunchList)
    setDinner(data.data.dinnerList)
    setWastage(data1.data.foodWaste)

  },[]);

  const [Click_1, SetClick_1] = useState(false);
  const [Click_2, SetClick_2] = useState(false);
  const AccordianClick_1 = (e) => {
    SetClick_1(!Click_1);
  };
  const AccordianClick_2 = (e) => {
    SetClick_2(!Click_2);
  };

  return (
    <div>
      {localStorage.getItem("token") ? (
        <div>
          <Navbar />
          <div className="messages">
            Wastage : 
            <span> <b> {wastage || 10} </b> kg of food wasted yesterday, 
            <br/>                 It could have feed {wastage *2 || 20} people</span>
            <br/>
            {/* Message :
            <span> {} </span> */}
          </div>
          <button class="accordion">
            <pre>
              Lunch Total items : {lunch.length} <span style={{float:'right'}}>Time : 12pm{" "}
              <FontAwesomeIcon
                onClick={AccordianClick_1}
                icon={faChevronCircleDown}
              />
              </span>
            </pre>
          </button>
          <div class={Click_1 ? "panel_1" : "panel"}>
            {lunch.map((LunchItem) => {
              return (
                <li className="display_list_User">
                  <h4>{LunchItem}</h4>
                </li>
              );
            })}
          </div>

          <button class="accordion">
            
            <pre>
              Dinner Total items : {dinner.length}  <span style={{float:'right'}}>Time : 7pm{" "}
              <FontAwesomeIcon
                onClick={AccordianClick_2}
                icon={faChevronCircleDown}
              />
              </span> 
            </pre>
          </button>
          <div class={Click_2 ? "panel_1" : "panel"}>
            {dinner.map((DinnerItem) => {
              return (
                <li className="display_list_User">
                  <h4>{DinnerItem}</h4>
                </li>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20%" }}>
          <h2>
            Please <Link to="/login">login</Link> to continue
          </h2>
        </div>
      )}
    </div>
  );
};

export default UserItemsView;
