const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};
const setUser = (token) =>{
  //loginUser(initialState, token);
  setState({user: decoded});
}
/*
const loginUser = (state, token) => {
  return{
    ...state,
    isAuthenticated: !isEmpty(action.payload),
    user: action.payload
  }

};
*/

export default loginUser;
