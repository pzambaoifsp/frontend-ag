import jwtDecode from "jwt-decode";
import React, { Component, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import AgendamentoDataSource from "../../dataSource/AgendamentoDataSource";
import api from "../../services/api";
import "../../style/details.css";
import TokenUtils from "../../utils/TokenUtils";
import { Container, MenuItem, TextField } from "@mui/material";
import { DateTimePicker, DesktopDateTimePicker, LocalizationProvider, MobileDateTimePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Select from 'react-select';
import Values from "../../utils/Values";
import InfoMembroNaBanca from "../../components/details/InfoMembroNaBanca";

function BancaDetailsById() {
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
  const [htmlListaAvaliadores, setHtmlListaAvaliadores] = useState("");
  const [optionsAdms, setOptionsAdms] = useState([]);
  const [listaIdAdms, setListaIdAdms] = useState([])
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoBanca, setTipoBanca] = useState("");
  const [tema, setTema] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [listaParticipantes, setListaParticipantes] = useState("");
  const [listaAvaliadores, setListaAvaliadores] = useState([]);
  const [statusAgendamento, setStatusAgendamento] = useState("");
  const [adminsBanca, setAdminsBanca] = useState("");
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
        setListaParticipantes(response.data.data.listaParticipantes);
        setListaAvaliadores(response.data.data.listaAvaliadores);
        setAdminsBanca(response.data.data.listaAdmins)
        setStatusAgendamento(response.data.data.statusAgendamento);
      });
  }, []);

  useEffect(() => {
    listaAvaliadores.forEach(avaliador => {
      const divWithInfo =
        <InfoMembroNaBanca username={avaliador.username} prontuario={avaliador.prontuario} statusAgendamento={avaliador.statusAgendamento} />

      setHtmlListaAvaliadores(oldValues => [...oldValues, divWithInfo])
    })
  }, [listaAvaliadores])

  useEffect()



  useEffect(() => {
    const canEdit = false;

    const token = TokenUtils.getTokenOrEmptyToken();
    const tokenDecoded = jwtDecode(token)
    //const isCurrentUserAdmin = adminsBanca.find(tokenDecoded.id)
    /*
    if (isCurrentUserAdmin || tokenDecoded.permission.find("ADMIN"))
      canEdit = true
    else
      
    canEdit = false
    */

    setEnableToEdit(true)
  }, [adminsBanca])

  return (
    <div>
      <Header name={"Calendário"}></Header>
      <div className="wrrapper wapper--w900">
        <div class="container">
          <table class="table table-striped mt-5">
            <thead>
              <tr>
                <th className="mt-4" colspan="3"><font size='5'>Detalhes da Banca</font></th>
              </tr>
            </thead>
          </table>
          <h4 className="mt-4"><b>Banca: </b>{titulo}</h4>
          <h4 className="mt-4"><b>Descrição: </b>{descricao}</h4>
          <h4 className="mt-4"><b>Tipo de Banca: </b>{tipoBanca}</h4>
          <h4 className="mt-4"><b>Tema: </b>{tema}</h4>
          <h4 className="mt-4"><b>Apresentação: </b>{dataAgendamento}</h4>
          <h4 className="mt-4"><b>Participantes: </b>{ }</h4>
          <h4 className="mt-4"><b>Avaliadores: </b>{htmlListaAvaliadores}</h4>
          <h4 className="mt-4"><b>Status: </b>{statusAgendamento}</h4>
          <h4 className="mt-4"><b>Administradores: </b>{ }</h4>
          <hr className="mt-4" />
        </div>
      </div>
    </div>
  );
}

export default BancaDetailsById;
