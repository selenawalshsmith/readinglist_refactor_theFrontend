import React, {Component}  from 'react';
import { Link } from 'react-router-dom'; //add links for pages
//import BookCard from "./grid/BookCard";
import Explore from "./Explore";
import axios from 'axios';

//console.log(Bookcard.props);

class Book extends Component {

constructor(props) {
  super(props);
  this.state=
  {
    bookItem:[]
  };
}
getBookID(pathname){
  var path_arr = pathname.split("/");
  return path_arr[2];
}
componentDidMount(){
  const id = this.getBookID(this.props.location.pathname);
  axios.get('https://www.googleapis.com/books/v1/volumes/' + id)
    .then((response) => {
      //console.log(response.data.volumeInfo);
      const book = {
        title: response.data.volumeInfo.title,
        publisher: response.data.volumeInfo.publisher,
        author: response.data.volumeInfo.author,
        description: response.data.volumeInfo.description,
        publishedDate: response.data.volumeInfo.publishedDate,
        rating: response.data.volumeInfo.publishedDate.averageRating
      }
      this.setState({bookItem: book});
    })
    .catch(function (error){
      console.log(error);
    })

}

  render (){
    console.log(this.state.bookItem);
    const book = this.state.bookItem;
    return (
      <div className="content" style={{marginTop: "25px"}}>
      <h1>{book.title}</h1>
      <h3>Publisher: {book.publisher}</h3>
      <div style={{marginTop: "25px"}}>
        {book.description}
      </div>
      </div>
    )
  }
}

export default Book;
