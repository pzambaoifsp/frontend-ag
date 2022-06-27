import "../../style/footer.css"

export default function Footer(props){
  return <footer className="site-footer">
    <div className="container">
      <hr />
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <p className="copyright-text center">
            Copyright © 2022 Todos os Direitos Reservados por{" "}
            <a href="#">ADS - IFSP Guarulhos</a>.
          </p>
        </div>
      </div>
    </div>
  </footer>
}