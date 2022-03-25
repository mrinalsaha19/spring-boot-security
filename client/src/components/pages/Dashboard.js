import React, { Component } from 'react'
import { connect } from 'react-redux';
import { resetUser, fetchUser } from '../Services/LoginSlice'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
   componentWillUnmount() {
     this.props.resetUser();
   }
   componentDidMount() {
     console.log("called did mount")
     this.props.fetchUser(this.props.token.jwt);
   }
  logout = () => {
   // this.props.logout();
    //window.location.replace(`${window.location.origin}/myApp/login`);
    this.props.history.goBack();

  }
  render() {
    console.log(this.props.token.jwt);
    console.log(this.props.fetchStatus);
    if (this.props.fetchStatus === "idle") {
      return (<div>Loading...</div>); 
    } else 
    return (
     
      <div>
        {this.props.status === 'error' && <div>
          <label>{this.props.error.message}</label>
          <label>{this.props.fetchStatus}</label>
          <div>
          <button type='button' onClick = { () => this.props.history.goBack()}>back</button>
          </div>
          </div>}
          {this.props.status === 'success' && <div>
            <label>welcome {this.props.user.userName}</label>
            <div>
            <button type='button' onClick = { this.logout}>Logout</button>
            </div>
        </div>}
      </div> 
    )
  }
}

export default connect(
  (state) => ({
    user : state.login.user,
    error: state.login.error,
    status: state.login.status,
    token: state.login.token,
    fetchStatus: state.login.fetchUser.status
  }),
  { resetUser, fetchUser }
) (Dashboard)