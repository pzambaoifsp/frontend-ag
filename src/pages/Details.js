import React, { Component, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../style/details.css";
import Select from 'react-select';
import FilterMembers from "../utils/FilterMembers";
import AgendamentoDataSource from "../dataSource/AgendamentoDataSource";
import UsersDataSource from "../dataSource/UsersDataSource";
import Values from "../utils/Values";
import { Container, MenuItem, TextField } from "@mui/material";

// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, DesktopDateTimePicker, LocalizationProvider, MobileDateTimePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import Header from "../components/Header/Header";
import TokenUtils from "../utils/TokenUtils";

function Details() {

  const optionsStatus = Values.status
  const optionsBanca = Values.optionsBanca

  const navigate = useNavigate();

  const [optionsAlunos, setOptionsAlunos] = useState([]);
  const [optionsProfessores, setOptionsProfessores] = useState([]);
  const [optionsAdms, setOptionsAdms] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoBanca, setTipoBanca] = useState("");
  const [tema, setTema] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [listaIdParticipantes, setListaIdParticipantes] = useState("");
  const [listaIdAvaliadores, setListaIdAvaliadores] = useState("");
  const [listaIdAdms, setListaIdAdms] = useState([])
  const [statusAgendamento, setStatusAgendamento] = useState("AGUARDANDO");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = TokenUtils.getTokenOrEmptyToken()
    UsersDataSource.getUsers(token).then(res =>
      setUsers(res.data.data)
    );

  }, [])

  useEffect(() => {
    FilterMembers.membersAlunos(users).forEach(user => {
      const value = { value: user.id, label: user.username }

      setOptionsAlunos(old => [...old, value]);
    })

    FilterMembers.membersProfessores(users).forEach(user => {
      const value = { value: user.id, label: user.username }

      setOptionsProfessores(old => [...old, value]);
      setOptionsAdms(old => [...old, value]);
    })
  }, [users])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = AgendamentoDataSource.addAgendamento(
        titulo,
        descricao,
        tipoBanca,
        tema,
        dataAgendamento,
        [parseInt(listaIdParticipantes)],
        [parseInt(listaIdAvaliadores)],
        statusAgendamento,
        [parseInt(listaIdAvaliadores)]
      );


      navigate("/boards");

    } catch (error) {
      console.log(`Erro ao realizar login: ${error.message}`);
    }
  };

  return (
    <div>
      <Header name={"Calendário"}></Header>

      <h1 className="center title-board mt-5">Cadastro da banca</h1>

      <div className="page-wrapper">
        <div className="wrapper wrapper--w900">
          <div className="card card-6">
            <div className="card-body">
              <form method="POST" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="name">Título</div>
                  <div className="value">
                    <TextField required label="Título da banca"
                      fullWidth
                      type="text"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Tema</div>
                  <div className="value">
                    <TextField required label="Tema da banca"
                      fullWidth 
                      variant="outlined"
                      type="text"
                      value={tema}
                      onChange={(e) => setTema(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Descrição</div>
                  <div className="value">
                    <TextField
                      label="Descrição da banca"
                      multiline
                      fullWidth
                      rows={4}
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Data de Agendamento</div>
                  <div className="value">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField fullWidth className="input--style-6 "{...props} />}
                        label="Data de agendamento"
                        value={dataAgendamento}
                        onChange={(newValue) => {
                          setDataAgendamento(newValue.toISOString().replace('T', ' ').substring(0, 16));
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="form-row">
                  <div className="name">Tipo de Banca</div>
                  <div className="value">
                    <Select
                      options={optionsBanca}
                      placeholder="Selecione um tipo da banca"
                      onChange={(data) => setTipoBanca(data.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="name">Participantes</div>
                  <div className="value">
                    <Select
                      options={optionsAlunos}
                      placeholder="Participantes da banca"
                      onChange={(data) => setListaIdParticipantes(
                        data.map(user => user.value
                        ))}
                      isMulti
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Avaliadores</div>
                  <div className="value">
                    <Select
                      options={optionsProfessores}
                      placeholder="Avaliadores da banca"
                      onChange={(data) => setListaIdAvaliadores(data.map(user => user.value))}
                      isMulti
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Administradores da Banca</div>
                  <div className="value">
                    <Select
                      options={optionsAdms}
                      placeholder="Admins da banca"
                      // value={adminsBanca}
                      onChange={(data) => setListaIdAdms(data.map(user => user.value))}
                      isMulti
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn--radius-2 btn--blue-2 float-right mb-5"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
