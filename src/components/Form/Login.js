import React, { useState } from "react";
import useForm from "./useForm";
import validate from '../ValidateRules/LoginValidate'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,Alert
} from "reactstrap";


function Login() {
  const [data, setData ] = useState('')
  const [alertDanger, setAlertDanger] = useState(false);

  const Login = async () => {
    const response = await fetch(`https://127.0.0.1:5000/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
    const jsonData = await response.json()
    if (jsonData.success)
    setData(jsonData)
    setAlertDanger(true)
      window.location.replace(`http://localhost:3000/?access_token=${jsonData.token}`)
    if (jsonData.result)
      setData(jsonData)
  };
  
  const { inputs, errors, handleInputChange, handleSubmit } = useForm (
    Login,
    validate
  );

  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
              <Alert color={data.success ? 'success' : 'danger'} isOpen={alertDanger}>
                <Container>
                  <div className="alert-wrapper">
                    <div className="message row">
                      <i className="nc-icon nc-bell-55"/>  
                      <Col>
                        <p>{data.result}</p>
                      </Col>
                    </div>
                  </div>
                </Container>
              </Alert>
                <h3 className="title mx-auto mt-2">Welcome</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-round  mt-0 mb-4"
                    color="facebook-bg"
                    href="https://127.0.0.1:5000/login/facebook"
                  >
                    Login with facebook
                  <i className="fa fa-facebook-square" />
                  </Button>
                </div>
                <Row className="mx-2">
                <Col  className="p-0" style={{borderBottom:"1px solid #CDCDCD", marginLeft:"10px", marginBottom:"10px"}}></Col>
                <Col xs="6" sm="8" className="p-0 text-center">or login with your email</Col>
              <Col className="p-0" style={{borderBottom:"1px solid #CDCDCD", marginRight:"10px", marginBottom:"10px" }}></Col>
              </Row>
                <Form className="register-form" onSubmit={handleSubmit}>
                <Form className={`form ${errors.email && 'has-danger'}`}>
                  <label>Email</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="text"
                      name="email"
                      value={inputs.email || ""}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  {errors.email && (
                    <p className="help text-danger">{errors.email}</p>
                  )}
                  </Form>
                  <Form className={`form ${errors.password && 'has-danger'}`}>
                  <label>Password</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      value={inputs.password || ""}
                      name="password"
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  {errors.password && (
                    <p className="help text-danger">{errors.password}</p>
                  )}
                  </Form>
                  <Button
                    outline
                    block
                    type="submit"
                    className="btn-round"
                    color="danger"
                  >
                    Login
                  </Button>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div>
              </Card>
              <div className="col text-center">
                <Button
                  className="btn-round"
                  outline
                  color="neutral"
                  tag={Link}
                  to='/register'
                  size="lg"
                >
                  View Register Page
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default Login;
