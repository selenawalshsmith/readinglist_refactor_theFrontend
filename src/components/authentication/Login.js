import React, {Component}  from 'react';
//import classnames from "classnames";
//import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import axios from "axios";
//import setAuthToken from "../../actions/setAuthToken";
import jwt_decode from "jwt-decode";
import books from "./books.png"
import "../../App.css";

class Login extends Component{
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      errors: {},
      error: ""
    };
  }
  setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
  setCurrentUser = (userEmail, history) => {
    history.push({
      //pathname: "/user/"+decoded.name,
      pathname: "/",
      state: { user: userEmail}
    });
  }
  loginUser = (userData, history) => {
    axios
    .post("https://readinglistbackend.herokuapp.com/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      console.log(res);
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
       this.setAuthToken(token);
       //Decode token to get user data
      const decoded = jwt_decode(token);
       //Set current user
       console.log(decoded);
       this.setCurrentUser(decoded.email, history);
    })
    .catch(err => {
      console.log(err);
      this.setState({error: "Wrong Email. Please try again."});
    }
   );
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.loginUser(userData, this.props.history);
  }
  render(){
    return(

      <div className="" style={{textAlign: "center"}}>

        <div className="AuthContainer">
                  <h2>Login</h2>
                <div>
                  <h4>{this.state.error}</h4>
                </div>
                <form onSubmit={this.onSubmit}>
                  <div style={{padding: '10px'}}>
                    <input
                      className="AuthInput"
                      placeholder="email"
                      id="email"
                      onChange={this.onChange}
                    ></input>
                  </div>
                  <div style={{padding: '10px'}}>
                    <input
                      className="AuthInput"
                      placeholder="password"
                      id="password"
                      onChange={this.onChange}
                      type="password"
                    ></input>
                  </div>
                  <div>
                    <button type="submit" className="btn" style={{padding: '10px'}}>Submit</button>
                  </div>
                </form>
                <div>
                  <h4>Need an account?</h4>
                    <div>
                      <Link to="./register"><button className="btn"><h4>Register</h4></button></Link>
                    </div>
                </div>
              </div>
        </div>

    )
  }
};

export default Login;
