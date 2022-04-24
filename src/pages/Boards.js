import React, { Component } from "react";


class Boards extends Component {

    render() {
        return ( 
            <div>
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
                            </form>
                        </div>
                    </div>
                </nav>

                <div className="container align-center">
                  <h1 className="center title">Bancas Cadastradas</h1>
                  <a href='/details' class='align-right'>Adicionar nova Banca</a>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Banca</th>
                        <th scope="col">Alunos</th>
                        <th scope="col">Orientador</th>
                        <th scope="col">Status</th>
                        <th scope="col">Apresentação</th>
                        <th scope="col">Detalhes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Examinador1, Examinador2, Examinador3..</td>
                        <td>Aluno1, Aluno2, Aluno3..</td>
                        <td>Robson</td>
                        <td>Em avaliação</td>
                        <td>18/06/2022</td>
                        <td><a href="/details" className="tblack">Visualizar</a></td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Examinador4, Examinador5, Examinador6..</td>
                        <td>Aluno4, Aluno5, Aluno6..</td>
                        <td>Giovane</td>
                        <td>Avaliado</td>
                        <td>20/06/2022</td>
                        <td><a href="/details" className="tblack">Visualizar</a></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Examinador7, Examinador8, Examinador9..</td>
                        <td>Aluno7, Aluno8, Aluno9..</td>
                        <td>Rodrigo</td>
                        <td>Esperando Apresentação</td>
                        <td>25/06/2022</td>
                        <td><a href="/details" className="tblack">Visualizar</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

            </div>

        );
    }
}

export default Boards;