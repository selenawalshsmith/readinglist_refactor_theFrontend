import React from 'react';
import Nav from "./Nav.js"
import "../../App.css";
import { useLocation } from 'react-router-dom';

function ShowNav(props){
  const location = useLocation();
  if(location.pathname === "/login" || location.pathname === "/register"){
    return <div></div>
  } else {
    return <Nav/>
  }
}
export default ShowNav;
