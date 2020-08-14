import React from 'react';
import BookGrid from "./grid/BookGrid";
import BookCard from "./grid/BookCard";

function ShowUserBooks(props){
  const isLoading = props.isLoading;
  if (!isLoading){
    return <BookGrid cols={3}>
            {
              props.myBooks.map((bookItem, i) => (
                  <BookCard title={bookItem.title} id={bookItem.id} author={bookItem.author} img={bookItem.img} description={bookItem.description} key={i} addBook={props.addBook}/>
            ))}
            </BookGrid>
  }
  return <div style={{margin: "auto"}}>
        <h1>Loading books...</h1>
         <h3>Please refresh if nothing happens</h3>
         </div>
}
export default ShowUserBooks;
