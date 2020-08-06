import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import ShowAddBook from './ShowAddBook'
import './card.css';


class BookCard extends Component {
  saveBook=(id)=>{
    this.props.saveBook(this.props.id);

  }
  render() {
      //const {id, title, author, img} = this.props.myBooks;
      return(
        <div className="card">
          <div className="container">
            <Grid>
              <Row>
                <Col>
                  <img src={this.props.img}/>
                </Col>
                <Col>
                  <div className="title-author-div">
                    <h2 className="card-title">{this.props.title}</h2>
                    <p>By {this.props.author}</p>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
            <ShowAddBook saveBook={this.saveBook} addBook={this.props.addBook} />
            <Link to={`/book/${this.props.id}`}>
              <button className="saveButton"><p>Description</p></button>
            </Link>
          {/*
          <div className="saveButtonContainer">
            <button className="saveButton" onClick={this.saveBook} ><p>Add to list</p></button>
            <Link to={`/book/${this.props.id}`}>
              <button className="saveButton"><p>Description</p></button>
            </Link>
          </div>
          */}
        </div>
      )
  }
}

export default BookCard;
