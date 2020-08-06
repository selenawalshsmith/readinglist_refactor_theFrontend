import React, {Component}  from 'react';
import axios from 'axios';
import ShowUserBooks from "./ShowUserBooks";
import jwt_decode from "jwt-decode";

class UserHome extends Component{
  constructor(props) {
    super(props);
    this.state= {
      user: this.props.user,
      isLoading: true,
      myBooks: [],
      //redirect: null,
      addBook: false
    }
  }
  getName(){
    return this.state.user;
  }
  getUser(){
    if(this.props.location.state.user == null){
      return this.props.user
    }else{
      return this.props.location.state.user;
    }
  }
  loadBooks = (email) => {
    axios.post("https://readinglistbackend.herokuapp.com/api/users/getBookList", {email: email})
    .then((response) => {
      //console.log(response.data.booklist);
      const bookList = response.data.booklist;
      const books = [];
      for (let i=0; i<bookList.length; i++){
        const bookItem = {
          id: bookList[i].id, //how I will save users books in db.
          title: bookList[i].title,
          author: bookList[i].author,
          description: bookList[i].description,
          img: bookList[i].img
        }
        books.push(bookItem);
      }
      this.setState({myBooks: books});
      this.setState({isLoading: false});
    }).catch(err => {console.log(err);});
  };
  componentDidMount(){
    //Check for user's JSON token
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      //get the email from token and setState
      this.setState({user: decoded.email});
      this.loadBooks(decoded.email);
    } else {
      //if there's no token redirect to user
      //this.setState({redirect: "/login"});
      window.location.href = "./login";
    }
  }

  render (){
    return (
      <div>
        {/*<div><Redirect to={this.state.redirect}/></div>*/}
        {/*<div>Hello {this.state.user}</div>*/}
        <div>My List</div>
        <div>
        <ShowUserBooks isLoading={this.state.isLoading} myBooks={this.state.myBooks} addBook={this.state.addBook}/>
        </div>
      </div>
    )
  }
};
export default UserHome;
