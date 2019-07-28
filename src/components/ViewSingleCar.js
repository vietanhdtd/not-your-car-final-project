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
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Input, Modal
} from "reactstrap";

import * as ReactDatetime from "react-datetime";
import Geosuggest from 'react-geosuggest';
import  useForm from './Form/useForm'
import ValidateBookingDate from './ValidateRules/CheckAvailableValidateRules';
import moment from 'moment'


function ViewSingleCar(props) {
  const [carInfo, setCarInfo] = useState({})
  const [location, setLocation] = useState("")
  const [pickDate, setPickDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [bookedDate, setBookedDate] = useState()
  const [errors, setErrors] = useState({})

  const [modal, setModal] = useState(false);

  let pageHeader = React.createRef();
  
  let yesterday = ReactDatetime.moment().subtract(1, 'day');
  
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
    let response = await fetch(`https://127.0.0.1:5000/booking`, {
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
    };  
  
  const toggleModal = () => {
      setModal(!modal);
  };

  const getBookingDate = async () => {
    const data = {'car_id' : props.match.params.id}
    console.log(data)
    const response = await fetch("https://127.0.0.1:5000/get_booking_datetime", {
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
            "url(" + require("assets/img/fabio-mangione.jpg") + ")"
        }}
        className="page-header page-header-xs"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
      </div>
      <div className="section profile-content">
      <Container>
        <h1>{carInfo.id}</h1>
        {bookedDate && bookedDate.filter(b => b.booking_status != "Done").map((i,idx) => {
          return (
            <div>
              <h6>Booking no.{idx+1}</h6>
              {i.location}
              <h6>From: {moment.utc(i.pick_date).format('MMMM Do YYYY, HH:mm')}</h6>
              <h6>To: {moment.utc(i.return_date).format('MMMM Do YYYY, HH:mm')}</h6>
            </div>
          )
        })}
        <Row className="mt-5">
              <Col sm="4" xs="12" className="mb-3">
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
                <Col sm="3" xs="12">
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
            <Col sm="2" xs="12">
            <Button type="submit" onClick={handleBooking}>Book</Button>
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
                    Modal title
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
    </>
  );
}

export default ViewSingleCar;