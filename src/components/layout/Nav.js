import React, {Component}  from 'react';
import { Link} from 'react-router-dom';
import LogoutUser from '../LogoutUser.js'
import "../../App.css";
import { useLocation } from 'react-router-dom'
//import { Link } from 'react-router-dom'; //add links for pages
/*
<Link to={{pathname:"/explore", state:{user: this.state.user}}}><button>Explore</button></Link>
<Link to={{pathname:"/explore", state:{user: this.state.user}}}><button>Explore</button></Link>
*/
class Nav extends Component{
  constructor() {
    super();
    this.state = {
      //showLogin: true,
      //showRegister: true,
      //showLogout: false,
    };
  }
  hideItems(){
    if (localStorage.jwtToken) {
      console.log("token found");

      this.setState({showLogin: false});
      this.setState({showLogout: true});
    }
  }

  compomonentDidMount(){
    this.hideItems();
    let location= useLocation();
    if (location.pathname == "/login"){
      console.log(location.pathname);
      this.setState({showLogout: false});
    }
  }
  render(){
    const { showLogin  } = this.state;
    //const { showRegister  } = this.state;
    const { showLogout  } = this.state;
    return (
      <div>
        <div className="navbar-wrapper">
      {/*<header style={headerStyle}>*/}
            <div className="NavItemContainer" style={headerStyle}>
              <header>
                <Link to='/'>
                  <h1 style={{paddingTop:"5px", fontSize: "60px" }}>Reading List </h1>
                </Link>
                </header>
              <ul>
                <div style={{float: 'right'}}>
                  <Link to="/explore" style={{padding: '10px'}} >Explore</Link>
                  <Link to="/" style={{padding: '10px'}}>Home</Link>
                  { showLogin
                    ? <Link to='/login' style={{padding: '10px'}} id="login">Login</Link>
                    : null
                  }
                  { showLogin
                    ? <Link to='/register' style={{padding: '10px'}} id="register">Register</Link>
                    : null
                  }
                  { showLogout
                    ? null
                    : <LogoutUser/>
                  }
                </div>
            </ul>
            </div>
          {/*}</header>*/}
        </div>
      </div>
    )
  }
}
const headerStyle ={
  background: "#C6E4EE",
  color: '#C6E4EE',
  textAlign: 'left',
  paddingLeft: '30px',
  padding: '20px',
  fontSize: '25px',
  width: '100%',
  float: 'right'
}

export default Nav;
