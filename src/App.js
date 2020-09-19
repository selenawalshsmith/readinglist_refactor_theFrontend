import React, {Component} from 'react';
import Nav from "./components/layout/Nav";
import Explore from "./components/Explore";
import UserHome from "./components/UserHome";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";

//import setAuthToken from "./actions/setAuthToken";
import{BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom';
//import './App.css';

class App extends Component {
  render(){
    const location = useLocation();
    console.log(location.pathname);
    return (
      <Router>
        <div className="App">
        <div>
          <Nav/>
        </div>
        <div className="container">
          <Switch>
          <Route path="/" exact component={UserHome}/>
          <Route path="/explore" exact component={Explore}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/login" exact component={Login}/>
          {/* <Route path="/book" component={Book}/> */}
          </Switch>
        </div>
        </div>
      </Router>
    )
  }
}
export default App;
