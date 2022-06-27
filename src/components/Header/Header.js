import { Navigate } from "react-router-dom";

export default function Header(props) {

    const handleDeslog = async (event) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    
        Navigate("/login");
      };
    const name = props.name

    return <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-6">
    <div className="container">
      <a className="navbar-brand" href="/">
        {name}
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample07"
        aria-controls="navbarsExample07"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExample07">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-md-0">
          <a className="nav-link twhite" href="/login">
            Login
          </a>
          <a
            className="nav-link twhite"
            onClick={() => handleDeslog()}
            href="/login"
          >
            Deslogar
          </a>
        </form>
      </div>
    </div>
  </nav>
  </div>
}