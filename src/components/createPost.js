import React from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText, CustomInput, Row} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render () {
    return (
      <section id="lgoin-page-wrap" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 m-auto">
              <div className="login-page-content">
                <div className="login-form">
                  <form action="index.html">
                    <div className="name">
                      <div className="row">
                        <div className="col-md-6">
                          <input type="text" placeholder="Brand Name" />
                        </div>
                        <div className="col-md-6">
                          <input type="text" placeholder="Model" />
                        </div>
                      </div>
                    </div>
                    <div className="username">
                      <input type="email" placeholder="Description" />
                    </div>
                    <div className="username">
                      <input type="text" placeholder="Price per Day" />
                    </div>
                    <div className="username">
                      <input type="text" placeholder="Class" />
                      <input type="text" placeholder="Price per Day" />
                    </div>
                    <Row>
                    <Col>
                    <FormGroup className="col" >
                      <Label for="exampleCheckbox">Fuel</Label>
                      <Row className="justify-content-center">
                        <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Gasoline" />
                        <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Diesel" />
                      </Row>
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup className="col" >
                      <Label for="exampleCheckbox1">Radios</Label>
                      <Row>
                        <CustomInput type="radio" id="exampleCustomRadio3" name="customRadio" label="Select this custom radio" />
                        <CustomInput type="radio" id="exampleCustomRadio4" name="customRadio" label="Or this one" />
                      </Row>
                    </FormGroup>
                    </Col>
                    </Row>
                    <div>
                    </div>
                    <div className="log-btn">
                      <button type="submit">Sign Up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
)}}

export default PostForm;