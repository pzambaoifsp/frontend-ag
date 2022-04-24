import React, { Component } from "react";
import "react-router-dom";
import "../style/signinform.css";
import { GoogleLoginButton } from "react-social-login-buttons";
class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      login: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  render() {
    return (
      
      <div className="appForm">
        <h1 className="center">Login</h1>
        <div className="formCenter">
          <form className="formFields" onSubmit={this.handleSubmit}>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="login">
                Login
              </label>
              <input
                type="login"
                id="login"
                className="formFieldInput"
                placeholder="Digite o seu login"
                name="login"
                value={this.state.login}
                onChange={this.handleChange}
              />
            </div>

            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Digite a sua senha"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            <div className="formField">
              <button className="btn btn-block btn-primary" ><a href="/boards" className="twhite">Acessar</a></button>
            </div>

            <div className="formField center">
              <span>— Ou utilize a sua conta acadêmia —</span>
            </div>

            <div className="socialMediaButtons">
              <div className="googleButton">
                <GoogleLoginButton onClick={() => alert("Hello")}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignInForm;
