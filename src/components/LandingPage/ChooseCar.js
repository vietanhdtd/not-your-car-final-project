import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
  Badge,
  Button, Form, InputGroup, InputGroupAddon, InputGroupText, Input
} from "reactstrap";

// core components

function ChooseCar(props) {
  const [listCar, setListCar] = useState([]);
  console.log(listCar);
  useEffect(() => {
    setListCar(props.listCar.filter(car => car.car_status === "Available"));
  }, [props.listCar]);
  return (
    <>
      <div className="section">
        <Container>
          <Row className="my-2">
            <h2 className="title mx-auto">choose your car</h2>
          </Row>
          <Col>
            <Row className="w-100 d-flex flex-wrap">
              {listCar.slice(0, 6).map(car => {
                return (
                  <Link to={`/allcars/${car.id}`} className="mx-auto">
                    <Card style={{ width: "21.5rem" }} className="mx-auto">
                      <CardImg src={car.img} alt="cx-5" />
                      <CardBody>
                        <h6>
                          {car.brand_name} {car.model}
                        </h6>
                        <CardText>
                          status:{" "}
                          <Badge color="success" pill>
                            {car.car_status}
                          </Badge>
                        </CardText>
                        <CardText>
                          {car.description} {car.id}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Link>
                );
              })}
            </Row>
            <Row className="w-50 mx-auto mt-4">
            <Button className="btn btn-warning btn-round text-dark" tag={Link} to="/allcars" block>
              View More
            </Button>
            </Row>
          </Col>
        </Container>
        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="text-center">Keep in touch?</h2>
                <Form className="contact-form">
                  <Row>
                    <Col md="6">
                      <label>Name</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" />
                      </InputGroup>
                    </Col>
                    <Col md="6">
                      <label>Email</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="text" />
                      </InputGroup>
                    </Col>
                  </Row>
                  <label>Message</label>
                  <Input
                    placeholder="Tell us your thoughts and feelings..."
                    type="textarea"
                    rows="4"
                  />
                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button className="btn-fill" color="danger" size="lg">
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ChooseCar;
