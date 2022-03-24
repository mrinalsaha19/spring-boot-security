import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postLogin, loginUsingThunk, authenticate } from '../Services/LoginSlice'

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        username:'',
        password:''
      },
      user: {}
    }
  }
  handleInputChange = (event) =>{
    const target = event.target;
    this.setState({
      data: {...this.state.data, [target.name]: target.value}
    });
  }
    login = () => {
      const data = this.state.data;
      //this.props.postLogin(data)
      this.props.authenticate(data);
      this.props.loginUsingThunk(data)
      console.log(this.props.user)
        this.props.history.push('/dashboard');
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
          <button type='submit' onClick = { this.login}>Login</button>
      </div>
      </form>
      
    )
  }
}

export default connect(
  (state) => ({
    user : state.login.user
  }),
  { postLogin, loginUsingThunk, authenticate }
) (LandingPage)