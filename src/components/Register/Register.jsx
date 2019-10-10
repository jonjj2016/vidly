import React, { Component } from 'react';

class Register extends Component {
  state = {
    name: '',
    lastName: '',
    password: '',
    email: ''
  };
  onNameCahnge = e => {
    this.setState({ name: e.target.value });
  };
  onEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };
  onLasNameChange = e => {
    this.setState({
      lastName: e.target.value
    });
  };
  onPasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };
  onSubmitChange = () => {
    fetch('http://localhost:3001/register/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        lastName: this.state.lastName,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user) {
          this.props.loadUser(user);
          this.props.onRoutChange('home');
        }
      });
  };
  render() {
    return (
      <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  First Name
                </label>
                <input
                  onChange={this.onNameCahnge}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="firstName"
                  id="firstName"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Last Name
                </label>
                <input
                  onChange={this.onLasNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="lastName"
                  id="lastName"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitChange}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
