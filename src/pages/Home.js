import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import "../style/boards.css";
import api from "../services/api";



export function Home() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/confirm");
  };

  const [agendamentos, setAgendamentos] = useState([]);

  const handleListAgendamentos = async (event) => {
    try {
      const response = await api.get("/public/agendamentos", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAgendamentos(response.data.data);
    } catch (error) {
      console.log(`Erro ao carregar agendamentos: ${error.message}`);
    }
  };

  React.useEffect(() => {
    handleListAgendamentos();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            Calendário
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample07"
            aria-controls="navbarsExample07"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample07">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-md-0">
              <a className="nav-link twhite" href="/login">
                Login
              </a>
              <a
                className="nav-link twhite"
                
                href="/login"
              >
                Deslogar
              </a>
            </form>
          </div>
        </div>
      </nav>

      <div className="container align-center">
        <h1 className="center title-board">Bancas Cadastradas</h1>
        <table className="table table-hover table-boards">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Título</th>
              <th scope="col">Descrição</th>
              <th scope="col">Tipo de banca</th>
              <th scope="col">Tema</th>
              <th scope="col">Apresentação</th>
              <th scope="col">Participantes</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((item) => (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.titulo}</td>
                <td>{item.descricao}</td>
                <td>{item.tipoBanca}</td>
                <td>{item.tema}</td>
                <td>{item.dataAgendamento}</td>
                <td>{item.participantes}</td>
                <td className="st-status">{item.agendamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* <div className="appForm">
        <button type="button" onClick={handleGoToLogin}>
          Realizar login
        </button>
      </div> */}
    </div>
  );
}

export default Home;
