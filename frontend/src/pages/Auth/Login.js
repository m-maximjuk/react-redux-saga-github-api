import React from 'react';
import axios from 'axios';
import './Style.css';

class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.userForm = this.userForm.bind(this);
    this.logSuccess = this.logSuccess.bind(this);
    sessionStorage.clear();
  };
  logSuccess() {
    const user = sessionStorage.getItem('username');
    const loggedIn = sessionStorage.getItem('loggedIn');
    if(user !== '' && loggedIn){
      this.props.history.push("/app");
    }
  }
  userForm = (e) => {
    const that = this;
    e.preventDefault();
    axios.post('http://localhost:8080/api/login', {
      email: this.refs.email.value,
      password: this.refs.password.value
    })
    .then(function (response) {
      if(response.data.success){
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('loggedIn', response.data.success);
        that.logSuccess();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="container">
        <div className="card card-container">
            <img className="profile-img-card" src="/avatar_2x.png" alt="userIMG"/>
            <p className="profile-name-card"></p>
            <form onSubmit={ this.userForm }>
                <span className="reauth-email"></span>
                <input type="email" ref="email"  className="form-control mb-2" placeholder="Email address" required autoFocus />
                <input type="password" ref="password" className="form-control mb-2" placeholder="Password" required />
                <div id="remember" className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
            </form>
            <a href="#" className="forgot-password">
                Forgot the password?
            </a>
        </div>
    </div>
    );
  }
}
export default LoginPage;

