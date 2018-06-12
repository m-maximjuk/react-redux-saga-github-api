import React, { Component } from 'react';

const user = sessionStorage.getItem('username');
const loggedIn = sessionStorage.getItem('loggedIn');
class Main extends Component {
  componentWillMount(){

    if(user !== '' && loggedIn){
      this.props.history.push("/app");
    }
    else{
      this.props.history.push("/login");
    }
  }
  render(){
    return(
      <div></div>
    );
  }
}
export default Main;