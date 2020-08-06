import React, {Component}  from 'react';
//import {registerUser} from "../../actions/registerUser";
import axios from "axios";
import "../../App.css";

class Register extends Component{
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  registerUser = (userData, history) => {
    axios
    .post("https://readinglistbackend.herokuapp.com/api/users/register", userData)
    .then((res) => {
      history.push("/login");
      //console.log(res);
    }).catch(err => {
      //console.dir(err.response.data);
      this.state.errors = err.response.data;
      const i =1;
      Object.entries(this.state.errors).map((obj,i)=> {
        //console.log(obj[1]);
        this.setState((state) => {
          return{error: obj[1]}
        });
      })
    });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      password2: this.state.password2
    };
    //console.log(userData);
    this.registerUser(userData, this.props.history);
  }
  /*{this.state.errors.map((error)=>({
    error
  }))
}*/
  render(){
    return (
      <div>
      <div className="AuthContainer">
      <div>
        <h3>Register</h3>
      </div>
        <div>
          <h3>{this.state.error}</h3>
        </div>
        <form onSubmit={this.onSubmit}>
          <div>
          <input
            placeholder="email"
            id="email"
            onChange={this.onChange}
          ></input>
          </div>
          <div>
          <input
            placeholder="username"
            id="name"
            onChange={this.onChange}
          ></input>
          </div>
          <div>
          <input placeholder="password" id="password" onChange={this.onChange}></input>
          </div>
          <div>
          <input placeholder="confirm password" id="password2" onChange={this.onChange}></input>
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
        </div>
      </div>
    )
  }
};

export default Register;
