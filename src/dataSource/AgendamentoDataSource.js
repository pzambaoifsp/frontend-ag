import api from "../services/api";
import getTokenOrEmptyToken from "../utils/TokenUtils";

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
            Authorization: getTokenOrEmptyToken(),
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

export default {addAgendamento, getAgendamentoById} 