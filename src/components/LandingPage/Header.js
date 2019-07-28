import React, { useState,useEffect } from "react";

// reactstrap components
import {
  Button,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Form,
  Container,
  Row,
  Col
} from "reactstrap";
import * as ReactDatetime from "react-datetime";
import Geosuggest from 'react-geosuggest';
import validate from '../ValidateRules/CheckAvailableValidateRules';

function IndexHeader(props) {
  const [location, setLocation] = useState()
  const [pickDate, setPickDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [errors, setErrors] = useState({"":""})
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

  let booking = {location: location,
                pick_date: pickDate,
                return_date: returnDate
  }
  const handleBooking = () => {
    setErrors(validate(booking))

  };  
  const hanldeCheking = () => {
    if (Object.keys(errors).length === 0) {
      props.checkAvailable(booking)
      console.log(Object.keys(errors).length)
    }
  }
  useEffect(() => {
    hanldeCheking()
}, [errors]);
  
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/antoine-barres.jpg") + ")"
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">BOOK A CAR TODAY</h1>
            </div>
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
                        utc = {true}
                        timeFormat = 'HH:mm'
                        isValidDate={ validPick }
                        value={pickDate}
                        timeFormat = 'HH:mm'
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
            <Button className="text-dark" type="submit" color='warning' onClick={handleBooking} block>Check</Button>
            </Col>
              </Row>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")"
          }}
        />
      </div>
    </>
  );
}

export default IndexHeader;