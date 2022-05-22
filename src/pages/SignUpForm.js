import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/signupform.css";

function SignUpForm(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [prontuario, setProntuario] = useState("");
    const [username, setUsername] = useState("");
    const [permission, setPermission] = useState("");
    const [shouldSendConfirmationCode, setShouldSendConfirmationCode] = useState("");
  
    const handleCreateUser = async (event) => {
      event.preventDefault();
  
      try {
          
        const response = await api.post("/auth/register", {
            email,
            password,
            prontuario,
            username,
            permission,
            shouldSendConfirmationCode: true
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Redirecionar
        navigate("/confirm")
        
      } catch(error) {
        console.log(`Erro ao realizar cadastro: ${error.message}`);
      }
    }
    return (
    <div className="page-wrapper">
    <div className="wrapper wrapper--w900">
        <div className="card card-6">
            <div className="card-body"> 
                <form method="POST" onSubmit={handleCreateUser} >
                    <div className="form-row">
                        <div className="name">Email</div>
                        <div className="value">
                            <input 
                                type="text" 
                                id="email"
                                className="input--style-6" 
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            /> 
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="name">Senha</div>
                        <div className="value">
                            <input 
                                type="text" 
                                id="password"
                                className="input--style-6" 
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="name">Prontuário</div>
                        <div className="value">
                            <input 
                                type="text" 
                                id="prontuario"
                                className="input--style-6" 
                                name="prontuario"
                                value={prontuario}
                                onChange={(e) => setProntuario(e.target.value)}
                            />
                        </div>
                    </div> 
                    <div className="form-row">
                        <div className="name">Nome do usuário</div>
                        <div className="value">
                            <input 
                                type="text" 
                                id="username"
                                className="input--style-6"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="name">permission</div>
                        <div className="value">
                            <input 
                                type="text" 
                                id="permission"
                                className="input--style-6" 
                                name="permission"
                                value={permission}
                                onChange={(e) => setPermission(e.target.value)}
                            />
                        </div>
                    </div> 

                    <div className="form-row">
                        <div className="name">shouldSendConfirmationCode</div>
                        <div className="value">
                            <input 
                                type="checkbox" 
                                id="shouldSendConfirmationCode"
                                className="input--style-6" 
                                name="shouldSendConfirmationCode"
                                value={shouldSendConfirmationCode}
                                onChange={(e) => setShouldSendConfirmationCode(e.target.value)}
                            />
                        </div>
                    </div> 

                    {/* <input type="text" id="permission" name="permission" value="ADMIN" onChange={(e) => setPermission(e.target.value)} hidden/> */}
                    {/* <input type="checkbox" id="shouldSendConfirmationCode" checked name="shouldSendConfirmationCode" value={shouldSendConfirmationCode} onChange={(e) => setShouldSendConfirmationCode(e.target.value)} hidden/> */}

                    <div className="formField">
                        <button type="submit" className="btn btn-block btn-primary">Acessar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
  );
}

export default SignUpForm;
