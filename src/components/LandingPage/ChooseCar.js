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
import { faStar } from "@fortawesome/free-solid-svg-icons";


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
                <h2 className="title">Let's talk product</h2>
                <p className="description">
                  This is the paragraph where you can write more details about
                  your product. Keep you user engaged by providing meaningful
                  information. Remember that by this time, the user is curious,
                  otherwise he wouldn't scroll to get here. Add a button if you
                  want the user to see more.
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
                    <h4 className="info-title">Beautiful Gallery</h4>
                    <p className="description">
                      Spend your time generating new ideas. You don't have to
                      think of implementing.
                    </p>
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
                    <h4 className="info-title">New Ideas</h4>
                    <p>
                      Larger, yet dramatically thinner. More powerful, but
                      remarkably power efficient.
                    </p>
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
                    <h4 className="info-title">Statistics</h4>
                    <p>
                      Choose from a veriety of many colors resembling sugar
                      paper pastels.
                    </p>
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
                    <h4 className="info-title">Delightful design</h4>
                    <p>
                      Find unique and handmade delightful designs related items
                      directly from our sellers.
                    </p>
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
                          status:{" "}
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
                          <Col>
                        <Rating
                        readonly
                        initialRating={5}
                        // onChange={rate => setRate(rate)}
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
