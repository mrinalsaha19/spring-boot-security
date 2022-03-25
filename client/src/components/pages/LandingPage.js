import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postLogin, loginUsingThunk, authenticate, fetchBearerToken, authSuccess, fetchUser } from '../Services/LoginSlice'

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: '',
        jwt:''
      },
      user: {},
      response: {}
    }
  }
  componentDidUpdate() {


    console.log(this.props.token);


  }
  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      data: { ...this.state.data, [target.name]: target.value }
    });
  }
  login = () => {
    const data = this.state.data;
    //this.props.postLogin(data)
    //axios.create();
    axios.post("/myApp/api/authenticate", data)
      .then((res) => {
        if (res.status === 200 && res.data.successCode === '200') {
          this.props.authSuccess(res.data);
          if(this.props.token.jwt !== undefined) {
            this.setState({
              data:  {...this.state.data, jwt: this.props.token.jwt}
            })
            console.log(this.state.data)
            this.props.loginUsingThunk(this.state.data);
            this.props.fetchUser(this.props.token.jwt);
            this.props.history.push('/dashboard');
          }
         
        } else if (res.status === 200 && res.data.errorCode === '303') {
          //  dispatch(loginFailure(res.data));
        }
      })
  }
  render() {
    return (
      <form>
        <div>
          <label>UserName</label>
          <input
            type="text"
            name='username'
            value={this.state.data.username}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name='password'
            value={this.state.data.password}
            onChange={this.handleInputChange}
          />
        </div>

        <div>
          <button type='button' onClick={this.login}>Login</button>
        </div>
      </form>

    )
  }
}

export default connect(
  (state) => ({
    user: state.login.user,
    token: state.login.token,
    status: state.login.status
  }),
  { postLogin, loginUsingThunk, authenticate, fetchBearerToken, authSuccess, fetchUser }
)(LandingPage)