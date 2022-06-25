import api from "../services/api";

async function getUsers(token) {
    const response = api.get(`users`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      return response;
}

export default {getUsers}