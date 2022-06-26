import api from "../services/api";
import TokenUtils from "../utils/TokenUtils";

async function addAgendamento(
  titulo,
  descricao,
  tipoBanca,
  tema,
  dataAgendamento,
  listaIdParticipantes,
  listaIdAvaliadores,
  statusAgendamento,
  adminsBanca
) {
  const response = await api.post(
    "/agendamentos",
    {
      titulo,
      descricao,
      tipoBanca,
      tema,
      dataAgendamento,
      listaIdParticipantes,
      listaIdAvaliadores,
      statusAgendamento,
      adminsBanca
    },
    {
      headers: {
        Authorization: TokenUtils.getTokenOrEmptyToken(),
      },
    }
  )

  return response;
}

async function getAgendamentoById(accessToken, id) {
  const response = await api
    .get(`agendamentos/${id}`, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    })

  return response;
}
async function deleteAgendamentoById(accessToken, id) {
  const response = await api.delete(`agendamentos/${id}`, {
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  })

  return response
}

async function getAgendamentos(accessToken) {

  const response = await api.get("/agendamentos", {
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  });

  return response;
}

export default { addAgendamento, getAgendamentoById, deleteAgendamentoById, getAgendamentos } 