// ---------- Cursor Parking Lot <3 ---------- //
//                                             //
//                                             //
// ------------------------------------------- //

import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Reminder from "./components/Reminder";
import PostureDetector from "./components/PostureDetector";
import StretchingInstructor from "./components/StrechingInstructor";
import Home from "./components/Home";
import Landing from "./components/Landing";



function App() {
  

  return (
    <BrowserRouter>
      <h1 style={{marginTop: 75}}><a href="/home">Our Web Name</a></h1>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" exact component={Home} />
        <Route path="/reminder" exact component={Reminder} />
        <Route path="/posture-detector" exact component={PostureDetector} />
        <Route path="/streching=instructor" exact component={StretchingInstructor} />
      </Switch>      
    </BrowserRouter>
    
  );
}

export default App;
