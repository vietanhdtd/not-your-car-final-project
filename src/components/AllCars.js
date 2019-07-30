import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {
Container,
Row,
Col,
Card,
CardImg,
CardBody,
CardText,
NavItem,
NavLink,
Nav,
TabContent,
TabPane,
Badge
} from "reactstrap";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function AllCars(props) {
    const [listCar, setListCar] = useState([]);
    const [activeTab, setActiveTab] = useState("1");



    const toggle = tab => {
    if (activeTab !== tab) {
        setActiveTab(tab);
        }
    };

    console.log(props);
    console.log("list car", listCar);

    document.documentElement.classList.remove("nav-open");


    useEffect(() => {
    setListCar(props.listCar);
    document.body.classList.add("register-page");
    return function cleanup() {
        document.body.classList.remove("register-page");
    };
    }, [props.listCar]);

    return (
    <div>
        <div
        className="all-car-header d-flex align-items-end justify-content-center mb-4"
        style={{
            backgroundImage:
            "url(" + require("assets/img/allCar_header.png") + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }}
        >
        <Row className="my-5">
            <h1 className="title mx-auto text-white">choose your car</h1>
        </Row>
        </div>
        <Container>
        <div className="my-5">
            <div className="nav-tabs-navigation m-5">
            <div className="nav-tabs-wrapper">
                <Nav id="tabs" role="tablist" tabs>
                <NavItem>
                    <NavLink
                    className={
                        activeTab === "1" ? "active font-weight-bold" : ""
                    }
                    onClick={() => {
                        toggle("1");
                    }}
                    >
                    <a href='#' style={{color: "black"}}>Available Car</a>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={
                        activeTab === "2" ? "active font-weight-bold" : ""
                    }
                    onClick={() => {
                        toggle("2");
                    }}
                    >
                    <a href='#' style={{color: "black"}}>Booked Car</a>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={
                        activeTab === "3" ? "active font-weight-bold" : ""
                    }
                    onClick={() => {
                        toggle("3");
                    }}
                    >
                    <a href='#' style={{color: "black"}}>All Car</a>
                    </NavLink>
                </NavItem>
                </Nav>
            </div>
            </div>
            <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <div className="w-100 d-flex flex-wrap">
                {listCar
                    .sort()
                    .filter(car => car.car_status === "Available")
                    .map(car => {
                    return (
                        <Link to={`/allcars/${car.id}`} className="mx-auto">
                        <Card style={{ width: "21.5rem" }} className="mx-auto">
                            <CardImg top src={car.img} alt="cx-5" />
                            <CardBody>
                            <h6>
                                {car.brand_name} {car.model}
                            </h6>
                            <CardText>
                                status:{" "}
                                <Badge color={car.car_status === "Available" ? 'success' : 'danger'} pill>
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
                            <Rating
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
                            </CardBody>
                        </Card>
                        </Link>
                    );
                    })}
                </div>
            </TabPane>
            <TabPane tabId="2">
                <div className="w-100 d-flex flex-wrap">
                {listCar
                    .sort()
                    .filter(car => car.car_status != "Available")
                    .map(car => {
                    return (
                        <Link to={`/allcars/${car.id}`} className="mx-auto">
                        <Card style={{ width: "21.5rem" }} className="mx-auto">
                            <CardImg top src={car.img} alt="cx-5" />
                            <CardBody>
                            <h6>
                                {car.brand_name} {car.model}
                            </h6>
                            <CardText>
                                status:{" "}
                                <Badge color={car.car_status === "Available" ? 'success' : 'danger'} pill>
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
                            <Rating
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
                            </CardBody>
                        </Card>
                        </Link>
                    );
                    })}
                </div>
            </TabPane>
            <TabPane tabId="3">
                <div className="w-100 d-flex flex-wrap">
                {listCar.sort().map(car => {
                    return (
                        <Link to={`/allcars/${car.id}`} className="mx-auto">
                        <Card style={{ width: "21.5rem" }} className="mx-auto">
                            <CardImg top src={car.img} alt="cx-5" />
                            <CardBody>
                            <h6>
                                {car.brand_name} {car.model}
                            </h6>
                            <CardText>
                                status:{" "}
                                <Badge color={car.car_status === "Available" ? 'success' : 'danger'} pill>
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
                            </CardBody>
                        </Card>
                        </Link>
                    );
                })}
                </div>
            </TabPane>
            </TabContent>
        </div>
        </Container>
    </div>
    );
    }

export default AllCars;
