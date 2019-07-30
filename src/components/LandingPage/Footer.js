import React from "react";

import { Row, Container,Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faRegistered } from '@fortawesome/free-solid-svg-icons'

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
                  target="_blank"
                >
                  Not Your Car <FontAwesomeIcon icon={faRegistered}/>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                >
                  VietAnhNguyen
                </a>
              </li>
              <li>
                <a
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