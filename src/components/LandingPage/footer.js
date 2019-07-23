import React from "react";

// reactstrap components
import { Row, Container,Col } from "reactstrap";

function Footer() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
         <Col sm="5" xs="12" className="d-flex justify-content-center">
         <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="#"
                  target="_blank"
                >
                  Viet Anh Nguyen
                </a>
              </li>
              <li>
                <a
                  href="http://blog.creative-tim.com/?ref=pkr-footer"
                  target="_blank"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/license?ref=pkr-footer"
                  target="_blank"
                >
                  Licenses
                </a>
              </li>
            </ul>
          </nav>
          </Col>
          <Col xs="12" sm="2" className="d-flex justify-content-center">
            <div className="credits"><i class="nc-icon nc-app" /></div>
          </Col>
          <Col xs="12" sm="5" className="d-flex justify-content-center">
          <div className="credits mx-auto">
            <span className="copyright font-weight-bold">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Viet Anh Nguyen
            </span>
          </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;