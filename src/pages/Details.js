import React, { Component } from "react";
import "../style/details.css";


class Details extends Component {

    render() {
       
        return ( 
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration"> 
                        <div className="card-body p-4 p-md-5">
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Detalhes Banca</h3>
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input type="text" id="lastName" placeholder="Tema" className="form-control form-control-lg" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <select className="form-control form-control-lg">
                                            <option value="1">Banca</option>
                                            <option value="2">Subject 1</option>
                                            <option value="3">Subject 2</option>
                                            <option value="4">Subject 3</option>
                                        </select>
                                    </div>  
                                    
                                    
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <select className="form-control form-control-lg">
                                            <option value="1">Banca</option>
                                            <option value="2">Subject 1</option>
                                            <option value="3">Subject 2</option>
                                            <option value="4">Subject 3</option>
                                        </select>
                                    </div> 
                                    <div className="col-md-6 mb-4 d-flex align-items-center">
                                        <div className="form-outline datetimepicker w-100">
                                            <input
                                            type="text"
                                            className="form-control form-control-lg datetimepicker"
                                            placeholder="Orientador" 
                                            id="Apresentação Banca"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <select className="form-control form-control-lg">
                                            <option value="1">Status</option>
                                            <option value="2">Subject 1</option>
                                            <option value="3">Subject 2</option>
                                            <option value="4">Subject 3</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-4 pb-2">
                                        <div className="form-outline">
                                            <input placeholder='Apresentação' type="date" id="emailAddress" className="form-control form-control-lg" />
                                        </div>
                                    </div>
                                </div>
                                <div className="formField">
                                    <button className="btn btn-block btn-primary" ><a href="/boards" className="twhite">Salvar</a></button>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}



export default Details;