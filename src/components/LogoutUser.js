import React from 'react';
//import setAuthToken from "../actions/setAuthToken";
//import { useHistory } from 'react-router-dom';
import "../App.css";

function LogoutUser(){
  //const history = useHistory();
  const redirectToLogin = () => {
    if (localStorage.jwtToken) {
      localStorage.removeItem("jwtToken");
      window.location.href = "./login";
    }
  };
  //componentDidMount(){
    /*if (!localStorage.jwtToken){
      return null;
    }*/
  //};
  return (
    <a className="NavItem" style={{padding: '10px'}} onClick={redirectToLogin} >Logout</a>
  )
}

export default LogoutUser;
