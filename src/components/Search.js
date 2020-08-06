import React, {Component}  from 'react';

//import { Link } from 'react-router-dom'; //add links for pages


class Search extends Component{
//  var searchQuery;
//  const searchQuery;
constructor(props) {
  super(props);
  this.state={searchQuery:''}
  this.handleChange = this.handleChange.bind(this);
  this.hitEnter = this.hitEnter.bind(this);
}
handleChange = (e) => {
  //this.props.searchQuery = search;
  this.setState({searchQuery: e.target.value});

}
  hitEnter= (e) => {
    this.props.performSearch(e, this.state.searchQuery);
      //console.log('value', e.target.value);
  }
  render (){
    return (
      <input type="text" placeholder="Search books.." value={this.state.searchQuery} style={searchStyle} name="searchQuery" onKeyDown={this.hitEnter} onChange={this.handleChange}/>
    )
  }
}

const searchStyle = {
  width: '400px',
  float: 'right',
  padding: '6px',
  border: 'none',
  marginTop: '8px',
  marginRight: '16px',
  fontSize: '17px',
  borderRadius: '10px'
}
/*
Search.propTypes = {
  myBooks: PropTypes.array.isRequired
}
*/
export default Search;
