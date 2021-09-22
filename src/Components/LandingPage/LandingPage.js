import './LandingPage.css'

const LandingPage=() =>{
    return(
        <>
  <div id="mistake_cover" />
  <div className="parallax">
    <div id="group1" className="parallax__group">
      <div className="parallax__layer parallax__layer--base">
        <div id="Title"><h1>Resource Management<br />System</h1></div>
        <div style={{fontSize: '150%', color: 'white', position: 'absolute', top: '5%', left: '60%'}}><a href="#user_login">Consumer</a></div>
        <div style={{fontSize: '150%', color: 'white', position: 'absolute', top: '5%', left: '75%'}}><a href="#garage_login">Resource Manager</a></div>
        <div style={{textSize:'150%',textAlign:'left',color: 'white', position: 'absolute', width: '600px',top: '60%', left: '10%'}}><span>Resource managers in a food providing organization need an efficient way to control the
wastage of food which happens due to the absence of its consumers without prior notice,
and to facilitate the enrichment of their services to consumers since there is no existing
connection between them. Our solution is delivering a web portal that creates
transparency between consumers of food and the resource managers and ensures the
resources will be managed properly.</span></div>
      </div>
      <div className="parallax__layer parallax__layer--deep">
        <div id="animations" className>
          <div id="circle1" className="circle" />
          <div id="circle2" className="circle" />
          <div id="circle3" className="circle" />
          <div id="half_circle1" className="half_circle" />
          <div id="half_circle2" className="half_circle" />
        </div>
      </div>
    </div>
    <div id="group2" className="parallax__group">
      <div className="parallax__layer parallax__layer--base">
        <div id="user_login">
          <h1 id="user_heading">Are you a Consumer then here you go!</h1>
          <button id="Loign_user" className="button"><span><a className="CredA" href="/login">Login</a></span></button>
          <button id="Signup_user" className="button"><span><a className="CredA" href="/">Signup</a></span></button>
          <div style={{fontSize: '200%', color: '#3098f3', position: 'absolute', top: '3%', left: '40%'}}>Features</div>
          <span className="features" style={{top: '15%', left: "40%"}}>You can see your profile with your details and the<br />contributions you made since last weeks</span>
          <span className="features" style={{top: '45%', left: "40%"}}>You can view the menu items for Lunch, Dinner<br />with help of a dropdown menu</span>
          <span className="features" style={{top: '75%', left: "40%"}}>You can request the absence to Lunch or Dinner<br />and intimate the Resource Manger prior</span>
        </div>
        <div className="container">
          <div style={{marginTop: "50px"}} className="cardLand">
            <div className="icon">
              <span style={{fontSize: '100%'}}>1</span>
            </div>
            <div className="snapshot"><br /><br /><br />Profile</div>
          </div>
          <div style={{position: "absolute", top: "105%"}} className="cardLand">
            <div className="icon">
              <span style={{fontSize: '100%'}}>2</span>
            </div>
            <div className="snapshot"><br /><br />Menu Itmes View</div>
          </div>
          <div style={{position: "absolute", top: "200%"}} className="cardLand">
            <div className="icon">
              <span style={{fontSize: '100%'}}>3</span>
            </div>
            <div className="snapshot"><br /><br />Absence Request Subbmission</div>
          </div>
        </div>
      </div>
    </div>
    <div id="group3" className="parallax__group">
      <div className="parallax__layer parallax__layer--base">
        <div id="garage_login">
          <h1 id="garage_heading">Are you a Resource Manager then here you go!</h1>
          <button id="Loign_garage" className="button"><span><a className="CredA" style={{color: "#3098f3"}} href="/AdminLogin">Login</a></span></button>
          <button id="Signup_garage" className="button"><span><a className="CredA" style={{color: "#3098f3"}} href="/AdminSignup">Signup</a></span></button>
          <div style={{fontSize: '200%', color: 'white', position: 'absolute', top: '3%', left: '40%'}}>Features</div>
          <span className="features" style={{top: '15%', left: "40%", color: 'white'}}>You can see the statistics of food wastage and<br />attendace for today and past six months</span>
          <span className="features" style={{top: '45%', left: "40%", color: 'white'}}>You can the see total strength and absentees for both<br />Lunch and Dinner, also can send messages to users</span>
          <span className="features" style={{top: '75%', left: "40%", color: 'white'}}>You can edit the menu items for Lunch, Dinner<br />and update the food cooked and wasted</span>
        </div>
        <div className="container">
          <div style={{marginTop: "50px"}} className="cardLand">
            <div className="icon">
              <span style={{fontSize: '100%'}}>1</span>
            </div>
            <div className="snapshot" style={{color: "white"}}><br /><br />Dashboard with Statistics</div>
          </div>
          <div style={{position: "absolute", top: "105%"}} className="cardLand">
            <div className="icon">
              <span style={{fontSize: '100%'}}>2</span>
            </div>
            <div className="snapshot" style={{color: "white"}}><br /><br /><br />Absence View</div>
          </div>
          <div style={{position: "absolute", top: "200%"}} className="cardLand">
            <div className="icon">
              <span style={{fontSize: '100%'}}>3</span>
            </div>
            <div className="snapshot" style={{color: "white"}}><br /><br /><br />Edit</div>
          </div>
        </div>
      </div>
    </div></div></>



    );
}

export default LandingPage;