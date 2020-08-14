import React, {Component, KeyboardEvent} from 'react';
import axios from 'axios';
import BookGrid from "./grid/BookGrid";
import BookCard from "./grid/BookCard";
import Search from './Search';
import jwt_decode from "jwt-decode";
import "../App.css";

class Explore extends Component{
  constructor(props) {
    super(props);
    this.state = {
      //user: this.props.location.state.user,
      myBooks: [],
      searchQuery: "empty",
      addBook: true
    }
  }
  getInitialBookList = () => {
  fetch('https://www.googleapis.com/books/v1/users/105309221066047026022/bookshelves/1001/volumes')
    .then(response => response.json())
    .then((responsedata) => {
    //  console.log(responsedata.items);
      const bookList = [];
      for(var i=0; i < responsedata.items.length; i++){
        const bookItem = {
          id: responsedata.items[i].id, //how I will save users books in db.
          title: responsedata.items[i].volumeInfo.title,
          author: responsedata.items[i].volumeInfo.authors,
          description: responsedata.items[i].volumeInfo.description,
          img: responsedata.items[i].volumeInfo.imageLinks.thumbnail
        }
        bookList.push(bookItem);
      }
      //console.log(bookList);
      this.setState({myBooks: bookList});
    }).catch(function (error){
      console.log(error);
    //console.log("fail");
  });
 };
 componentDidMount(){
    this.getInitialBookList();
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      this.setState({user: decoded.email});
    } else {
      this.props.history.push("/login");
    }
 }
 saveBook = (bookID) => {
    console.log(bookID);
    this.state.myBooks.map((book)=>{
      if(book.id === bookID){
        console.log("success");
        const jsonBook= JSON.stringify(book);
        axios.post("https://readinglistbackend.herokuapp.com/api/users/addBook", {email: this.state.user, book: jsonBook})
        .then((response) => {
          console.log(response);
        }).catch(err => {console.log(err);});
      }
   })
    /*
    axios.post("/api/users/addBook", {email: this.state.user, book: bookID})
    .then((response) => {
      console.log(response);
    }).catch(err => {console.log(err);});
    */
  }
  //document.getElementbyId
  performSearch = (event: KeyboardEvent<HTMLInputElement>, searchQuery ) => {
    if(event.key === 'Enter'){
       fetch('https://www.googleapis.com/books/v1/volumes?q='+searchQuery)
        .then(response => response.json())
        .then((responsedata) => {
            console.log(responsedata.items);
            const bookList = [];
            for(var i=0; i < responsedata.items.length; i++){
              let bookImgThumbnailUrl;
              let bookImgThumbnail;
              //console.log(responsedata.items[i].volumeInfo.imageLinks.thumbnail);
              if (responsedata.items[i].volumeInfo.imageLinks.thumbnail === undefined){
                bookImgThumbnail = "../../../public/noimageavailable.png";
              } else {
                bookImgThumbnailUrl = responsedata.items[i].volumeInfo.imageLinks.thumbnail;
                bookImgThumbnailUrl = bookImgThumbnailUrl.slice(4);
                bookImgThumbnail = "https"+bookImgThumbnailUrl;
                }
              //console.log(bookImgThumbnail);
              const bookItem = {
                id: responsedata.items[i].id,
                title: responsedata.items[i].volumeInfo.title,
                author: responsedata.items[i].volumeInfo.authors,
                description: responsedata.items[i].volumeInfo.description,
                //img: responsedata.items[i].volumeInfo.imageLinks.thumbnail
                img: bookImgThumbnail
              }
              bookList.push(bookItem);
            }
            //console.log(bookList);
            this.setState({myBooks: bookList});
         }).catch(function (error){
            console.log(error);
            //console.log("fail");
        });
    }
  }
  render (){
    return (
      /* <div id="wrapper"> */
      /*  <div id="content"> */
          <div className="container" style={{paddingTop: "30px"}}>
            <Search performSearch={this.performSearch} searchQuery={this.state.searchQuery}/>
            <h1>Search for books</h1>
            <div>
              <BookGrid cols={3}>
              {
                this.state.myBooks.map((bookItem, i) => (
                  <BookCard saveBook={this.saveBook} title={bookItem.title} id={bookItem.id} author={bookItem.author} img={bookItem.img} description={bookItem.description} key={i} addBook={this.state.addBook}/>
                ))}
              </BookGrid>
            </div>
          </div>
        /*</div>*/
      /*</div>*/
    )
  }
}

export default Explore;
