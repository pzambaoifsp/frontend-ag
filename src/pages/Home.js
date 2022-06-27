import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import "../style/boards.css";
import api from "../services/api";
import Header from "../components/Header/Header";
import formatDate from "../utils/FormatDate";



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
      <Header name={"Calendário"}></Header>

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
                <td>{formatDate(item.dataAgendamento)}</td>
                <td className="st-status">{item.statusAgendamento}</td>
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
