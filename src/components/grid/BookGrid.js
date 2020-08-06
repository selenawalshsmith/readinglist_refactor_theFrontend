import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {chunk} from 'lodash';

//import '../../bootstrap/css/bootstrap.min.css'
import './card.css';
//chunk... USE CHUNK TO CREATE DA ROWS...
//this.props.myBooks = the array of myBooks in the App.js State
type flexColumns = {
  cols: 1 | 2 | 3 | 4 | 6 | 12
}
/*class BookGrid extends Component {
  render() */
  const BookGrid: React.FC<flexColumns> = ({ cols, children}) =>
  {
    //const numOfColumns = 3;
    const rows = chunk(React.Children.toArray(children), cols);
    return (
      <Grid fluid style={gridStyle}>
      {rows.map((cols, i) =>(
        <Row key={i}>
          {cols.map((col, i) => (
            <Col sm={12} md={4} key={i}>
              {col}
            </Col>
          ))}
        </Row>
      ))}
      </Grid>
    )
  }

/*
  this.propTypes = {
    myBooks: PropTypes.array.isRequired
  }
*/

const gridStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
  minWidth: '100%',
  padding: '40px'
}





export default BookGrid;
