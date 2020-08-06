import React from 'react';
//import UserHome from "./UserHome";
//this function component is the button to add a book to the book list
//this function only adds the add book button to the book card in /explore

function ShowAddBook(props){
  const addBook = props.addBook;
  if (addBook){
    return <button className="saveButton" onClick={props.saveBook} ><p>Add to list</p></button>
  }else{
    return <div></div>
  }
}
export default ShowAddBook;
