import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  Alert,
  TabPane,
  Container,
  Row,
  Col,
  Badge, Modal
} from "reactstrap";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import * as ReactDatetime from "react-datetime";
import Geosuggest from 'react-geosuggest';
import  useForm from './Form/useForm'
import ValidateBookingDate from './ValidateRules/CheckAvailableValidateRules';
import moment from 'moment'
import Footer from "./LandingPage/Footer";


function ViewSingleCar(props) {
  const [carInfo, setCarInfo] = useState({})
  const [location, setLocation] = useState("")
  const [pickDate, setPickDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [bookedDate, setBookedDate] = useState()
  const [errors, setErrors] = useState({})
  // const [invalid, setInvalid] = useState({})
  const [alert, setAlert] = useState(false);
  const [modal, setModal] = useState(false);

  let pageHeader = React.createRef();
  
  let yesterday = ReactDatetime.moment().subtract(1, 'day');


  const onDismiss = () => {
    setAlert(!alert);
  };

  const validPick = ( current ) => {
    return current.isAfter( yesterday );
  };
  const validReturn = ( current ) => {
    return current.isAfter( pickDate );
  };
  
  const handlePickDateSelect = (e) => {
        setPickDate(e.toDate())
        setReturnDate("")
  }
  const handleReturnDateSelect = (e) => {
        setReturnDate(e.toDate())
  }   
  const handleLocationSelect = (suggest) => {
        if (suggest === undefined)
          setLocation("")
        else
          setLocation(suggest.label)
  }
  const handleBooking = async () => {
    let booking = {location: location,
                  pick_date: pickDate,
                  return_date: returnDate,
                  car_id : carInfo.id
    }
    let response = await fetch(`https://not-your-car.herokuapp.com/booking`, {
      method: "POST",
      headers: {
        'Authorization': `Token ${localStorage.getItem("token")}`,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking)   
      })
    const jsonData = await response.json()
    console.log(jsonData)
    if (jsonData.success)
      toggleModal()
    if (jsonData.success == false){
      onDismiss()
    }
    };  
  
  const toggleModal = () => {
      setModal(!modal);
  };

  const getBookingDate = async () => {
    const data = {'car_id' : props.match.params.id}
    console.log(data)
    const response = await fetch("https://not-your-car.herokuapp.com/get_booking_datetime", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const jsonData = await response.json();
    setBookedDate(jsonData)
    console.log(jsonData)
  };


  document.documentElement.classList.remove("nav-open");
  
  useEffect(() => {
    setCarInfo(props.listCar.find(car => car.id == props.match.params.id))
    // if (props.listCar.find(car => car.id == props.match.params.id).status === "Waiting"){
      getBookingDate()
    // }
    console.log(sessionStorage.getItem("token"))
    window.scrollTo(0, 0)

    document.body.classList.add("landing-page");
    if (props.checkingInfo){
      setLocation(props.checkingInfo.location)
      setPickDate(props.checkingInfo.pick_date)
      setReturnDate(props.checkingInfo.return_date)
    }
    return function cleanup() {
      document.body.classList.remove("landing-page");
    }
  },[]);
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/view-car-header.jpg") + ")"
        }}
        className="page-header page-header-xs"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
      </div>
      <div className="section profile-content">
      <Container>
        <Row>
          <Col sm="12" lg="6">
          <div className="owner">
            <div className="carpic">
              <img
                alt="..."
                className="img-thumbnail img-responsive"
                src={carInfo.img}
              />
            </div>
            <div className="name">
              <h2 className="title">
                  {carInfo.brand_name} {carInfo.model}
                <br />
              </h2>
              <h5 className="description mb-3">{carInfo.description}</h5>
              <h1 className="mb-3 p-0"><h6 className='m-0' pill>${carInfo.price}<small> /day</small></h6></h1>
            <Col className="text-center">
            <Badge color="vanh">{carInfo.class_name}</Badge>{" "}
              <Badge color="vanh">{carInfo.fuel}</Badge>{" "}
              <Badge color="vanh">{carInfo.door} door</Badge>{" "}
              <Badge color="vanh">{carInfo.gear_box}</Badge>{" "}
              <br />
              <Col className="mt-3">
              <Rating
              readonly
              initialRating={carInfo.rate}
              emptySymbol={
                <FontAwesomeIcon
                  icon={faStar}
                  color="#f5f5f0"
                  size="2x"
                  
                />
              }
              fullSymbol={
                <FontAwesomeIcon
                  icon={faStar}
                  color="#fabd3c"
                  size="2x"
                />
              }
            />
            </Col>
            </Col>
            </div>
          </div>            
          </Col>
          <br />
          <Col className = "mt-4">
          <Alert color="danger" isOpen={alert} toggle={onDismiss}>
                  <b>Please choose another date</b>
                </Alert>
              <Col sm="12" xs="12" className="mb-3">
              <Geosuggest
                country = "VN"
                initialValue = {location}
                inputClassName = {`form ${errors.location && 'is-invalid'}`}
                placeholder={'Your Location'}
                onSuggestSelect={(suggest) => handleLocationSelect(suggest)}
                />
                {errors.location && (
                  <p className="help text-danger">{errors.location}</p>
                )}
              </Col>
                <Col sm="12" xs="12">
                  <FormGroup className ={`form ${errors.pick_date && 'has-danger'}`}>
                    <InputGroup className="date" id="datetimepicker1">
                      <ReactDatetime
                        timeFormat = 'HH:mm'
                        utc = {true}
                        isValidDate={ validPick }
                        value={pickDate}
                        onChange={handlePickDateSelect}
                        inputProps={{
                          readOnly:true,
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
                  <FormGroup className ={`form ${errors.return_date && 'has-danger'}`}>
                    <InputGroup className="date" id="datetimepicker2">
                      <ReactDatetime
                        utc = {true}
                        timeFormat = 'HH:mm'
                        isValidDate={ validReturn }
                        value={returnDate}
                        onChange={handleReturnDateSelect}
                        inputProps={{
                          readOnly:true,
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
            <Col sm="12" xs="12">
            <Button type="submit" color='danger' onClick={handleBooking} block>Book Now</Button>
            </Col>
            <h4 className='text-center'><Badge color="success" pill>Booked day</Badge></h4>
            {bookedDate && bookedDate.filter(b => b.booking_status != "Done").map((i,idx) => {
          return (
            <Col className='mt-4'>
              <Col className='mt-3'>
              <Badge color="default" pill>Booking No.{idx+1}</Badge>
              <h4 className='m-0'><h6><small>From : </small> {moment.utc(i.pick_date).format('MMMM Do YYYY, HH:mm')}</h6></h4>
              <h4 className='m-0'><h6><small>Until : </small> {moment.utc(i.return_date).format('MMMM Do YYYY, HH:mm')}</h6></h4>
              </Col>
            </Col>
          )
        })}
        </Col>
          </Row>
              <Modal isOpen={modal}  toggle={() => toggleModal()}>
                <div className="modal-header">
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={toggleModal}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    success booking
                  </h5>
                </div>
                <div className="modal-body">
                      <p>You have 10 minutes to confirm your booking.<br/> If not this car will available for everyone to book.</p>
                </div>
                <div className="modal-footer">
                      <Button
                      className="btn-link"
                      color="danger"
                      tag = {Link}
                      to = '/profile'
                    >
                      Confirm Now
                    </Button>
                </div>
              </Modal>
          </Container>
      </div>
      <Footer/>
    </>
  );
}

export default ViewSingleCar;