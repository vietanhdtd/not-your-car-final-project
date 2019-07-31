import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faRegistered } from "@fortawesome/free-solid-svg-icons";


function ChooseCar(props) {
  const [listCar, setListCar] = useState([]);
  console.log(listCar);
  useEffect(() => {
    setListCar(props.listCar.filter(car => car.car_status === "Available"));
  }, [props.listCar]);
  return (
    <>
      <div className="section">
      <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">About not your car <FontAwesomeIcon icon={faRegistered}/></h2>
                <p className="description">
                not your car <FontAwesomeIcon icon={faRegistered}/> is a car sharing marketplace where guests can book any car they want, wherever they want it, from a vibrant community of local hosts across Viet Nam. Guests choose from a totally unique selection of nearby cars, while hosts earn extra money to offset the costs of car ownership.
                </p>
                <br />
                <Button
                  className="btn-round"
                  color="info"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  See Details
                </Button>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-album-2" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Free cancellation</h4>
                    <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-bulb-63" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Endless options</h4>
                    <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-chart-bar-32" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Insurance options included</h4>

                    <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-sun-fog-29" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">24/7 customer support</h4>

                    <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row className="my-2">
          <Col  className="p-0" sm='3' lg='4' xs='2' style={{borderBottom:"1px solid #CDCDCD", marginBottom:"60px", marginTop:"60px"}}></Col>
          <Col className="p-0 text-center" sm='6' xs='8' lg='4'> <h2 className="title mx-auto">available car</h2></Col>
          <Col className="p-0" lg='4' sm='3' xs='2' style={{borderBottom:"1px solid #CDCDCD", marginBottom:"60px", marginTop:"60px" }}></Col>
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
                          <Badge color="success" pill>
                            {car.car_status}
                          </Badge>
                        </CardText>
                        <CardText>
                          {car.description} {car.id}
                        </CardText>
                        <CardText>
                        <Badge color="vanh">{car.class_name}</Badge>{" "}
                        <Badge color="vanh">{car.fuel}</Badge>{" "}
                        <Badge color="vanh">{car.door} door</Badge>{" "}
                        <Badge color="vanh">{car.gear_box}</Badge>{" "}
                        </CardText>
                        <Row>
                          <Col xs='8' lg='8'>
                        <Rating
                        readonly
                        initialRating={car.rate}
                        emptySymbol={
                          <FontAwesomeIcon
                            icon={faStar}
                            color="#f5f5f0"
                            // size="3x"
                            
                          />
                        }
                        fullSymbol={
                          <FontAwesomeIcon
                            icon={faStar}
                            color="#fabd3c"
                            // size="3x"
                          />
                        }
                      />
                          </Col>
                          <Col><Badge color="default"><h6>${car.price}<small> /day</small></h6> </Badge></Col>
                        </Row>
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
      </div>
    </>
  );
}

export default ChooseCar;
