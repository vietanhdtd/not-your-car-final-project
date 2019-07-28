import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Container, Row, Col, FormGroup, Label } from "reactstrap";
import useForm from "./useForm";
import validate from "../ValidateRules/RegisterValidate";


function RegisterPage() {
  const [data, setData ] = useState('')
  document.documentElement.classList.remove("nav-open");
  const Register = async () => {
    console.log(inputs)
    const response = await fetch(`https://127.0.0.1:5000/register`, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
    const jsonData = await response.json()
    console.log(jsonData)
    console.log("check error email",errors.result)
    setData(jsonData.result)
    if (jsonData.success)
    window.location.replace('http://localhost:3000/login')
  };

  const { inputs, errors, handleInputChange, handleSubmit } = useForm (
    Register,
    validate
  );

  useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  return (
    <div
      className="page-header"
      style={{
        backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
      }}
    >
      <div className="filter" />
      <Container>
        <Row>
          <Col className="ml-auto mr-auto">
            <Card className="card-register ml-auto mr-auto">
              <h2 className="title mx-auto font-weight-bold">Register</h2>
              <div className="social-line text-center">
                <Button
                  className="btn-round mt-0 mb-4"
                  color="facebook-bg"
                  href="https://127.0.0.1:5000/login/facebook"
                >
                  Register with facebook
                  <i className="fa fa-facebook-square" />
                </Button>
              </div>
              <Row className="mx-2">
                <Col  className="p-0" style={{borderBottom:"1px solid #CDCDCD", margin:"10px"}}></Col>
                <Col xs="6" sm="4" className="p-0 text-center">or create account</Col>
              <Col className="p-0" style={{borderBottom:"1px solid #CDCDCD", margin:"10px" }}></Col>
              </Row>
              <Form className="register-form" onSubmit={handleSubmit}>
              <Form className={`form ${errors.email && 'has-danger'}`}>
                <Label>Email</Label>
                <Input
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleInputChange}
                />
                <p className="help text-danger">{data}</p>
                  {errors.email && (
                    <p className="help text-danger">{errors.email}</p>
                  )}
                </Form>
              <Form className={`form ${errors.name && 'has-danger'}`}>
                <Label>Name</Label>
                <Input
                  placeholder="Your Name"
                  type="text"
                  name="name"
                  value={inputs.name || ""}
                  onChange={handleInputChange}
                />
                  {errors.name && (
                    <p className="help text-danger">{errors.name}</p>
                  )}
                </Form>
                <Form className={`form ${errors.confirm && 'has-danger'}`}>
                <label>Password</label>
                <Input
                  placeholder="Password"
                  type="password"
                  value={inputs.password || ""}
                  name="password"
                  onChange={handleInputChange}
                />
                {errors.password && (
                    <p className="help text-danger">{errors.password}</p>
                  )}
                </Form>
                <Form className={`form ${errors.confirm && 'has-danger'}`}>
                <label>Confirm Password</label>
                <Input
                  placeholder="Password"
                  type="password"
                  name="confirm"
                  value={inputs.confirm || ""}
                  onChange={handleInputChange}
                />
                {errors.confirm && (
                    <p className="help text-danger">{errors.confirm}</p>
                  )}
                </Form>
                <Button
                  block
                  type="submit"
                  className="btn-round"
                  color="danger"
                >
                  Register
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterPage;
