import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/signform.css";
import {validEmail, validEmailProf, validPassword, validPront, validName} from '../utils/regex'


function SignUpForm() {
  const navigate = useNavigate();

  const [emailErr, setEmailErr] = useState(false);
  const [emailProf, setEmailProf] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [validProntErr, setValidProntErr] = useState(false);
  const [validNameErr, setValidNameErr] = useState(false);

  const validate = (event) => {
    event?.preventDefault();

    const emailIsProf = validEmailProf.test(email)
    setEmailProf(emailIsProf)

    const emailIsValid = validEmail.test(email)
    setEmailErr(!emailIsValid)
    
    const passwordIsValid = validPassword.test(password)
    setPasswordErr(!passwordIsValid)
    
    const prontIsValid = validPront.test(prontuario)
    setValidProntErr(!prontIsValid)

    const nameIsValid = validName.test(username)
    setValidNameErr(!nameIsValid)
    
    if ((emailIsValid) && (passwordIsValid) && (prontIsValid) && (nameIsValid)){
      handleCreateUser()
    }  
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prontuario, setProntuario] = useState("");
  const [username, setUsername] = useState("");

  const handleCreateUser = async () => {
    try {
      const response = await api.post(
        "/auth/register",
        {
          email,
          password,
          prontuario,
          username,
          permission: emailProf ? 'PROFESSOR' : 'ALUNO',
          shouldSendConfirmationCode: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("email_confirmation", email);

      // Redirecionar
      navigate("/confirm");
    } catch (error) {
      console.log(`Erro ao realizar cadastro: ${error.message}`);
    }
  };
  return (
    <div className="appForm">
      <h1 className="center mb-4">Realizar Cadastro</h1>
      <div className="formCenter mt-5">
        <form className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              Email acad??mico
            </label>
            <input
              type="text"
              id="email"
              className="formFieldInput"
              placeholder="Digite seu email acad??mico"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailErr && <p>Digite um e-mail v??lido. Lembre-se, o e-mail deve pertencer ao dom??nio "ifsp.edu.br"</p>}
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Digite uma senha"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordErr && <p>Senha inv??lida. A senha precisa conter 8 caract??res: maiusculos, minusculos e num??rico.</p>}
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Prontu??rio
            </label>
            <input
              type="text"
              id="prontuario"
              className="formFieldInput"
              placeholder="Digite o seu prontu??rio"
              name="prontuario"
              value={prontuario}
              onChange={(e) => setProntuario(e.target.value)}
            />
           {validProntErr && <p>Digite um prontu??rio v??lido.</p>}
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Nome do usu??rio
            </label>
            <input
              type="text"
              id="username"
              className="formFieldInput"
              placeholder="Digite o nome do usu??rio"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {validNameErr && <p>O nome precisa conter no m??nimo 3 caract??res.</p>}
          </div>
          <div className="formField">
            <button
              type="submit"
              className="btn btn-block btn-primary"
              onClick={validate}
            >
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
