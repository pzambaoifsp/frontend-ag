import React, { Component, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../style/details.css";
import getTokenOrEmptyToken from "../utils/TokenUtils";

function Edit() {
  const router = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState();

  useEffect(() => {
    const { id } = router;
    setId(id);

    const token = getTokenOrEmptyToken();

    api
      .get(`agendamentos/${id}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTitulo(response.data.data.titulo);
        setDescricao(response.data.data.descricao);
        setTipoBanca(response.data.data.tipoBanca);
        setTema(response.data.data.tema);
        setDataAgendamento(
          response.data.data.dataAgendamento.replace("T", " ")
        );
        setListaIdParticipantes(response.data.data.listaIdParticipantes);
        setListaIdAvaliadores(response.data.data.listaIdAvaliadores);
        setStatusAgendamento(response.data.data.statusAgendamento);
      });
  }, []);

  const handleDeslog = async (event) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    Navigate("/login");
  };

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoBanca, setTipoBanca] = useState("");
  const [tema, setTema] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [listaIdParticipantes, setListaIdParticipantes] = useState("");
  const [listaIdAvaliadores, setListaIdAvaliadores] = useState("");
  const [statusAgendamento, setStatusAgendamento] = useState("");
  const [adminsBanca, setAdminsBanca] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = "Bearer " + localStorage.getItem("access_token");
      console.log(token);

      console.log(id);

      const response = await api.put(
        "/agendamentos/",
        {
          id: parseInt(id),
          titulo,
          descricao,
          tipoBanca,
          tema,
          dataAgendamento,
          listaIdParticipantes: [1],
          listaIdAvaliadores: [2],
          statusAgendamento,
          adminsBanca: [2]
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      navigate("/boards");
    } catch (error) {
      console.log(`Erro ao editar: ${error.message}`);
    }
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
            <div className="form-inline my-2 my-md-0">
              <a className="nav-link twhite" href="/login">
                Login
              </a>
              <a
                className="nav-link twhite"
                onClick={handleDeslog}
                href="/login"
              >
                Deslogar
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="page-wrapper">
        <div className="wrapper wrapper--w900">
          <div className="card card-6">
            <div className="card-body">
              <form method="POST" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="name">Título</div>
                  <div className="value">
                    <input
                      className="input--style-6"
                      type="text"
                      name="full_name"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Descrição</div>
                  <div className="value">
                    <div className="input-group">
                      <textarea
                        className="textarea--style-6"
                        name="message"
                        placeholder=""
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Tipo de Banca</div>
                  <div className="value">
                    <select
                      className="input--style-6 form-control"
                      value={tipoBanca}
                      onChange={(e) => setTipoBanca(e.target.value)}
                    >
                      <option value="TCC_CURSO_TECNICO">
                        TCC Curso Técnico
                      </option>
                      <option value="TCC_CURSO_SUPERIOR">
                        TCC Curso Superior
                      </option>
                      <option value="MONOGRAFIA_SUPERIOR">
                        Monografia Curso
                      </option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Tema</div>
                  <div className="value">
                    <input
                      className="input--style-6"
                      type="text"
                      name="full_name"
                      value={tema}
                      onChange={(e) => setTema(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Data de Agendamento</div>
                  <div className="value form-outline">
                    <input
                      placeholder=""
                      type="text"
                      id=""
                      className="input--style-6 form-control"
                      value={dataAgendamento}
                      onChange={(e) => setDataAgendamento(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Participantes</div>
                  <div className="value">
                    <select
                      className="input-group form-control"
                      value={listaIdParticipantes}
                      onChange={(e) => setListaIdParticipantes(e.target.value)}
                    >
                      <option value="1">Participantes</option>
                      <option value="2">teste2</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Avaliadores</div>
                  <div className="value">
                    <select
                      className="input-group form-control"
                      value={listaIdAvaliadores}
                      onChange={(e) => setListaIdAvaliadores(e.target.value)}
                    >
                      <option value="1">Avaliadores</option>
                      <option value="2">Testes</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Status Agendamento</div>
                  <div className="value">
                    <select
                      className="input-group form-control"
                      value={statusAgendamento}
                      onChange={(e) => setStatusAgendamento(e.target.value)}
                    >
                      <option value="AGENDADO">Agendado</option>
                      <option value="AGUARDANDO">Aguardando</option>
                      <option value="CANCELADO">Cancelado</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Administradores da Banca</div>
                  <div className="value">
                    <select
                      className="input-group form-control"
                      value={adminsBanca}
                      onChange={(e) => setAdminsBanca(e.target.value)}
                    >
                      <option value="1">Avaliadores</option>
                      <option value="2">Testes</option>
                    </select>
                  </div>
                </div>
                {/*<div className="form-row">
                                    <div className="name">Upload CV</div>
                                    <div className="value">
                                        <div className="input-group js-input-file">
                                            <input className="input-file" type="file" name="file_cv" id="file"/>
                                            <label className="label--file" for="file">Choose file</label>
                                            <span className="input-file__info">No file chosen</span>
                                        </div>
                                        <div className="label--desc">Upload your CV/Resume or any other relevant file. Max file size 50 MB</div>
                                    </div>
                                </div>*/}
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn--radius-2 btn--blue-2"
                  >
                    Salvar
                  </button>
                  {/* onClick={event =>  window.location.href='./boards'} */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
