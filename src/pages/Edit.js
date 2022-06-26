import jwtDecode from "jwt-decode";
import React, { Component, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import AgendamentoDataSource from "../dataSource/AgendamentoDataSource";
import api from "../services/api";
import "../style/details.css";
import TokenUtils from "../utils/TokenUtils";
import { Container, MenuItem, TextField } from "@mui/material";
import { DateTimePicker, DesktopDateTimePicker, LocalizationProvider, MobileDateTimePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Select from 'react-select';
import Values from "../utils/Values";

function Edit() {
  const router = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState();

  const handleDeslog = async (event) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    Navigate("/login");
  };

  const optionsStatus = Values.status
  const optionsBanca = Values.optionsBanca

  const [optionsAlunos, setOptionsAlunos] = useState([]);
  const [optionsProfessores, setOptionsProfessores] = useState([]);
  const [optionsAdms, setOptionsAdms] = useState([]);
  const [listaIdAdms, setListaIdAdms] = useState([])
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoBanca, setTipoBanca] = useState("");
  const [tema, setTema] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [listaIdParticipantes, setListaIdParticipantes] = useState("");
  const [listaIdAvaliadores, setListaIdAvaliadores] = useState("");
  const [statusAgendamento, setStatusAgendamento] = useState("");
  const [adminsBanca, setAdminsBanca] = useState([]);
  const [enableToEdit, setEnableToEdit] = useState(false);

  useEffect(() => {
    const { id } = router;
    setId(id);

    const token = TokenUtils.getTokenOrEmptyToken();

    const response = AgendamentoDataSource.getAgendamentoById(token, id)
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
        setAdminsBanca(response.data.data.adminsBanca)
        setStatusAgendamento(response.data.data.statusAgendamento);
      });
  }, []);

  useEffect(() => {
    const canEdit = false;

    const token = TokenUtils.getTokenOrEmptyToken();
    const tokenDecoded = jwtDecode(token)
    console.log(tokenDecoded)

    console.log(adminsBanca)
    //const isCurrentUserAdmin = adminsBanca.find(tokenDecoded.id)
    /*
    if (isCurrentUserAdmin || tokenDecoded.permission.find("ADMIN"))
      canEdit = true
    else
      
    canEdit = false
    */

      setEnableToEdit(true)
  }, [adminsBanca])

  function validateIfUserCanModify(usersBanca) {


  }


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
      <Header name={"Calendário"}></Header>

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
                  <div className="name">Status da Banca</div>
                  <div className="value">
                    <Select
                      options={optionsStatus}
                      //defaultValue={}
                      //value={statusAgendamento}
                      placeholder="Status da banca"
                      onChange={(data) => setStatusAgendamento(data.value)}
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

export default Edit;
