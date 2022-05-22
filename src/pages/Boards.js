import React, { Component, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";
import "../style/boards.css";

function Boards() {

    const handleDeslog = async (event) => {
     
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")

        Navigate("/login");
    }

    const handleListAgendamentos = async (event) => {
      event.preventDefault();

      try{
          const token = "Bearer " + localStorage.getItem("access_token");

          const response = await api.get("/agendamentos",{
                headers: {
                  'Authorization': token,
                  'Content-Type': 'application/json'
              }
          });

          console.log(response.data.data[0].agendamento);
          

          
      } catch(error) {
          console.log(`Erro ao carregar agendamentos: ${error.message}`);
      }
  }



    return ( 
            <div>
                <div className="formFieldEC">
                    <button type="button" className="btn btn-block btn-primary" onClick={handleListAgendamentos}>Acessar</button>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">Calendário</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                                </button>

                        <div className="collapse navbar-collapse" id="navbarsExample07">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#"><span className="sr-only">(current)</span></a>
                                </li>                                
                            </ul>
                            <form className="form-inline my-2 my-md-0">
                              <a className="nav-link twhite" href="/login">Login</a>
                              <a className="nav-link twhite" onClick={ () => handleDeslog() } href="/login">Deslogar</a>
                            </form>
                        </div>
                    </div>
                </nav>
                

                <div className="container align-center">
                  <h1 className="center title-board">Bancas Cadastradas</h1>
                  <a href='/details' className='align-right add-mb'><i className="fa-solid fa-plus"></i> Adicionar nova Banca</a>
                  <table className="table table-hover table-boards">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Banca</th>
                        <th scope="col">Grupo</th>
                        <th scope="col">Orientador</th>
                        <th scope="col">Status</th>
                        <th scope="col">Apresentação</th>
                        <th scope="col" colSpan="2" >Detalhes</th>   
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Examinador1, Examinador2, Examinador3..</td>
                        <td>Aluno1, Aluno2, Aluno3..</td>
                        <td>Robson</td>
                        <td className="st-status"><span className="st-progress">Em avaliação</span></td>
                        <td>18/06/2022</td>
                        <td><a href="/details" className="tblack"><i className="fa-solid fa-magnifying-glass"></i></a></td>
                        <td><a href="/details" className="tblack"><i className="fa-solid fa-trash"></i></a></td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Examinador4, Examinador5, Examinador6..</td>
                        <td>Aluno4, Aluno5, Aluno6..</td>
                        <td>Giovane</td>
                        <td className="st-status"><span className="st-success">Avaliado</span></td>
                        <td>20/06/2022</td>
                        <td><a href="/details" className="tblack"><i className="fa-solid fa-magnifying-glass"></i></a></td>
                        <td><a href="/details" className="tblack"><i className="fa-solid fa-trash"></i></a></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Examinador7, Examinador8, Examinador9..</td>
                        <td>Aluno7, Aluno8, Aluno9..</td>
                        <td>Rodrigo</td>
                        <td className="st-status"><span className="st-waiting">Em espera</span></td>
                        <td>25/06/2022</td>
                        <td><a href="/details" className="tblack"><i className="fa-solid fa-magnifying-glass"></i></a></td>
                        <td><a href="/details" className="tblack" id="brabo"><i className="fa-solid fa-trash"></i></a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>

        );
    }


export default Boards;