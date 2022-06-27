import { Container, Table } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { Component, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddBancaButton from "../components/AddBancaButton/AddBancaButton";
import BancasTableHead from "../components/BancasTable/Head";
import DeleteBancaButton from "../components/DeleteBancaButton/DeleteBancaButton";
import EditButton from "../components/editBancaButton";
import Header from "../components/Header/Header";
import ViewDetailsBancaButton from "../components/viewDetailsBancaButton";
import AgendamentoDataSource from "../dataSource/AgendamentoDataSource";
import api from "../services/api";
import "../style/boards.css";
import formatDate from "../utils/FormatDate";
import TokenUtils from "../utils/TokenUtils";

function Boards() {
  localStorage.removeItem("email_confirmation");

  const [agendamentos, setAgendamentos] = useState([]);
  const token = TokenUtils.getTokenOrEmptyToken();
  const [bancasEnabledNoEdit, setEnabledToEdit] = useState([]);

  React.useEffect(() => {
    handleListAgendamentos();
  }, []);

  const handleListAgendamentos = async (event) => {
    try {
      const response = await AgendamentoDataSource.getAgendamentos(TokenUtils.getTokenOrEmptyToken())

      setAgendamentos(response.data.data);
    } catch (error) {
      const message = error.response.data.mensagem
      toast.error(message)
      console.log(`Erro ao carregar agendamentos: ${error.message}`);
    }
  };

  React.useEffect(() => {
    const tokenDecoded = jwtDecode(token)
    const hasAdminPermission = tokenDecoded.permissions.indexOf('ADMIN') != -1

    const bancasWithPermissionToEdit = (hasAdminPermission) ? agendamentos
      : agendamentos.filter(banca => banca.listaAdmins.map(user => user.id).indexOf(tokenDecoded.id) != -1)

    setEnabledToEdit(bancasWithPermissionToEdit.map(banca => banca.id))
  }, [agendamentos])

  function hasPermissionToManageThisBanca(idBanca) {
    return bancasEnabledNoEdit.indexOf(idBanca) != -1;
  }

  return (
    <div>
      <Header name={"Calendário"}></Header>

      <Container maxWidth={"xl"}>
        <h1 className="center title-board">Bancas Cadastradas</h1>
        <AddBancaButton enabled={TokenUtils.isProfessorOrAbove(token)}></AddBancaButton>

        <table className="table table-hover table-boards">
          <BancasTableHead />
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
                <td>
                  <DeleteBancaButton id={item.id} isEnabledToDelete={hasPermissionToManageThisBanca(item.id)} />
                </td>
                <td>
                  <EditButton id={item.id} isEnabledToEdit={hasPermissionToManageThisBanca(item.id)}></EditButton>
                </td>
                <td>
                  <ViewDetailsBancaButton id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>

  );
}

export default Boards;
