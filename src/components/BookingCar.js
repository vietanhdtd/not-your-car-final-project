import React, { useState, useEffect } from "react";
import {
  Container,
  CardBody,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  Col,
  Row,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  CardImg,
  Badge
} from "reactstrap";
import { Link } from "react-router-dom";
import useForm from "./Form/useForm";
import validate from "./ValidateRules/CheckAvailableValidateRules";
import * as ReactDatetime from "react-datetime";
import Geosuggest from "react-geosuggest";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function BookingCar(props) {
  const [modal, setModal] = useState(false);

  // const postToDB = async () => {
  //   console.log(inputs);
  //   const response = await fetch(`https://127.0.0.1:5000/create_post`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${sessionStorage.getItem("token")}`
  //     },
  //     body: JSON.stringify(inputs)
  //   });
  //   const jsonData = await response.json();
  //   if (jsonData.success) {
  //     toggleModal();
  //   } else alert("fail");
  // };

  const toggleModal = () => {
    setModal(!modal);
  };
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const [location, setLocation] = useState("");
  const [pickDate, setPickDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [errors, setErrors] = useState({});
  let yesterday = ReactDatetime.moment().subtract(1, "day");

  const validPick = current => {
    return current.isAfter(yesterday);
  };
  const validReturn = current => {
    return current.isAfter(pickDate);
  };

  const handlePickDateSelect = e => {
    setPickDate(e.toDate());
    setReturnDate("");
  };
  const handleReturnDateSelect = e => {
    setReturnDate(e.toDate());
  };
  const handleLocationSelect = suggest => {
    if (suggest === undefined) setLocation("");
    else setLocation(suggest.label);
  };

  let booking = {
    location: location,
    pick_date: pickDate,
    return_date: returnDate
  };
  const handleBooking = () => {
    setErrors(validate(booking));
  };
  const hanldeCheking = () => {
    if (Object.keys(errors).length === 0) {
      props.checkAvailable(booking);
      console.log(Object.keys(errors).length);
    }
  };
  useEffect(() => {
    hanldeCheking();
  }, [errors]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.checkingInfo) {
      setLocation(props.checkingInfo.location);
      setPickDate(props.checkingInfo.pick_date);
      setReturnDate(props.checkingInfo.return_date);
    }
  }, []);

  return (
    <>
      <div
        className="all-car-header d-flex align-items-end justify-content-center mb-4"
        style={{
          backgroundImage:
            "url(" + require("assets/img/view-car-header2.jpg") + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
          <Row className="mb-3">
          <Col sm="4" xs="12" className="mb-3">
            <Geosuggest
              country="VN"
              initialValue={location}
              inputClassName={`form ${errors.location && "is-invalid"}`}
              placeholder={"Your Location"}
              onSuggestSelect={suggest => handleLocationSelect(suggest)}
            />
            {errors.location && (
              <p className="help text-danger">{errors.location}</p>
            )}
          </Col>
          <Col sm="3" xs="12">
            <FormGroup className={`form ${errors.pick_date && "has-danger"}`}>
              <InputGroup className="date" id="datetimepicker1">
                <ReactDatetime
                  utc={true}
                  timeFormat = 'HH:mm'
                  isValidDate={validPick}
                  value={pickDate}
                  onChange={handlePickDateSelect}
                  inputProps={{
                    readOnly: true,
                    placeholder: "Pick Date"
                  }}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <span className="glyphicon glyphicon-calendar">
                      <i aria-hidden={true} className="fa fa-calendar" />
                    </span>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.pick_date && (
                <p className="help text-danger">{errors.pick_date}</p>
              )}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className={`form ${errors.return_date && "has-danger"}`}>
              <InputGroup className="date" id="datetimepicker2">
                <ReactDatetime
                  utc={true}
                  timeFormat = 'HH:mm'
                  isValidDate={validReturn}
                  value={returnDate}
                  onChange={handleReturnDateSelect}
                  inputProps={{
                    readOnly: true,
                    placeholder: "Return Date"
                  }}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <span className="glyphicon glyphicon-calendar">
                      <i aria-hidden={true} className="fa fa-calendar" />
                    </span>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.return_date && (
                <p className="help text-danger">{errors.return_date}</p>
              )}
            </FormGroup>
          </Col>
          <Col sm="2" xs="12">
            <Button className="text-dark" type="submit" color='warning' onClick={handleBooking} block>Check</Button>
            </Col>
        </Row>
        <div className="filter" />
      </div>
      <Container className="mt-5" style={{ zIndex: 1 }}>

        {props.availableCar.sort().map(car => {
          return (
            <Link to={`/allcars/${car.id}`} className="mx-auto">
              <Card style={{ width: "100%" }}>
                <CardBody className="row">
                  <Col sm="3">
                    <img
                      alt="..."
                      style={{ borderRadius: "12px", width: "20rem" }}
                      src={car.img}
                    />
                  </Col>
                  <Col>
                  <div className="h-75">
                  <CardTitle>Card title</CardTitle>
                    <CardSubtitle className="mb-2 text-muted">
                      Card subtitle
                    </CardSubtitle>
                    <CardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CardText>
                  </div>
                    <Row className="align-items-end">
                      status: 
                      <Badge
                        color={
                            car.car_status === "Available"
                            ? "success"
                            : "danger"
                        }
                        pill
                      >
                        {car.car_status}
                      </Badge>
                    </Row>
                  </Col>
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
      </Container>
    </>
  );
}

export default BookingCar;
