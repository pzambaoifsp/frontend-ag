import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/signinform.css";
import { GoogleLoginButton } from "react-social-login-buttons";
import api from "../services/api";

function SignInForm(){
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    params.append("email", email);
    params.append("password", password);

    try {
      const response = await api.post("/auth/login", params);

      const data = response.data;
      
      // Extrair os token
      const accessToken = data.data["access_token"];
      const refreshToken = data.data["refresh_token"];

      // Salvar os tokens
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // Redirecionar
      navigate("/boards")
      
    } catch(error) {
      console.log(`Erro ao realizar login: ${error.message}`);
    }
  }
  return (
    <div className="appForm">
      <h1 className="center">Login</h1>
      <div className="formCenter">
        <form className="formFields" onSubmit={handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              Login
            </label>
            <input
              type="text"
              id="email"
              className="formFieldInput"
              placeholder="Digite o seu login"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="formField">
            <button type="submit" className="btn btn-block btn-primary">Acessar</button>
          </div>

          <div className="formField center">
            <span>— Ou utilize a sua conta acadêmia —</span>
          </div>

          <div className="socialMediaButtons">
            <div className="googleButton">
              <GoogleLoginButton/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
