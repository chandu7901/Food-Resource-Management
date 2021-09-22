import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Signup from "./Components/Signup";
import Login from "./Components/Login";

import AdminLogin from './Components/Admin/adminLogin';
import AdminSignup from './Components/Admin/adminSignup';
import AdminDetails from './Components/UserDetails/UserDetails';

import LandingPage from './Components/LandingPage/LandingPage';

import Adminabsence from "./Components/AdminAbsenceView/AdminAbsenceView";
import TimetableEdit from "./Components/AdminEditPage/AdminEditPage";
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import SecondEdit from './Components/AdminEditPage/SecondEdit';

import Food from "./Components/UserRequest";
import UserItemsView from './Components/UserItemsView/UserItemsView';
import UserProfile from "./Components/UserProfile/UserProfile";

///this is for testng purpose only
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/userfood" component={Food}/>
          <Route exact path="/AdminAbsenceView" component={Adminabsence}/>
          <Route exact path="/TimetableEdit" component={TimetableEdit}/>
          <Route exact path="/UserProfile" component={UserProfile}/>
          <Route exact path="/AdminDashboard" component={AdminDashboard}/>
          <Route exact path="/SecondEdit" component={SecondEdit}/>
          <Route exact path="/AdminLogin" component={AdminLogin}/>
          <Route exact path="/AdminSignup" component={AdminSignup}/>
          <Route exact path="/AdminDetails" component={AdminDetails}/>
          <Route exact path="/UserItemsView" component={UserItemsView}/>
          <Route exact path="/" component={LandingPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
