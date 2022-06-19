import React, { Component, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";
import "../style/boards.css";

function Boards() {
  localStorage.removeItem("email_confirmation");

  const handleDeslog = async (event) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    Navigate("/login");
  };

  const [agendamentos, setAgendamentos] = useState([]);

  const handleListAgendamentos = async (event) => {
    try {
      const token = "Bearer " + localStorage.getItem("access_token");

      const response = await api.get("/agendamentos", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      setAgendamentos(response.data.data);
    } catch (error) {
      console.log(`Erro ao carregar agendamentos: ${error.message}`);
    }
  };

  const [id, setId] = useState("");

  React.useEffect(() => {
    handleListAgendamentos();
  }, []);

  const handleDeleteAgendamento = (id) => {
    console.log("apagando", id);

    const token = "Bearer " + localStorage.getItem("access_token");

    api
      .delete(`agendamentos/${id}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        window.location.reload();
      });
  };

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
                onClick={() => handleDeslog()}
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
        <a href="/details" className="align-right add-mb">
          <i className="fa-solid fa-plus"></i> Adicionar nova Banca
        </a>
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
              <th scope="col">Avaliadores</th>
              <th scope="col">Status</th>
              <th scope="col" colSpan="2">
                Detalhes
              </th>
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
                <td>{item.avaliadores}</td>
                <td className="st-status">{item.agendamento}</td>
                <td>
                  <a href={`/edit/${item.id}`} className="tblack">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </a>
                </td>
                <td>
                  <i
                    id="icone-click"
                    onClick={() => handleDeleteAgendamento(item.id)}
                    className="fa-solid fa-trash"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Boards;
