import React from "react";

// reactstrap components
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
  Input
} from "reactstrap";

import * as ReactDatetime from "react-datetime";
import Geosuggest from 'react-geosuggest';
import  useForm from './Form/useForm'
import ValidateBookingDate from './ValidateRules/bookingDateValidateRules';
import moment from 'moment'


function ViewSingleCar(props) {
  const [carInfo, setCarInfo] = React.useState({})
  const [location, setLocation] = React.useState("")
  const [pickDate, setPickDate] = React.useState("")
  const [returnDate, setReturnDate] = React.useState("")
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
    await fetch(`https://127.0.0.1:5000/booking`, {
      method: "POST",
      headers: {
        'Authorization': `Token ${sessionStorage.getItem("token")}`,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking)   
      })
    };  
  

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    console.log(sessionStorage.getItem("token"))
    window.scrollTo(0, 0)
    setCarInfo(props.listCar.find(car => car.id == props.match.params.id))
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
    document.body.classList.add("landing-page");
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
              <Row className="mt-5">
              <Col sm="4" xs="12">
              <Geosuggest
                placeholder={'Your Location'}
                onSuggestSelect={(suggest) => handleLocationSelect(suggest)}
                />
              </Col>
                <Col sm="3" xs="12">
                  <FormGroup>
                    <InputGroup className="date" id="datetimepicker1">
                      <ReactDatetime
                        isValidDate={ validPick }
                        value={pickDate}
                        onChange={handlePickDateSelect}
                        inputProps={{
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
                  </FormGroup>
            </Col>
                <Col>
                  <FormGroup>
                    <InputGroup className="date" id="datetimepicker2">
                      <ReactDatetime
                        isValidDate={ validReturn }
                        value={returnDate}
                        onChange={handleReturnDateSelect}
                        inputProps={{
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
                  </FormGroup>
            </Col>
            <Col sm="2" xs="12">
            <Button type="submit" onClick={handleBooking}>Book</Button>
            </Col>
              </Row>
          </Container>
      </div>
    </>
  );
}

export default ViewSingleCar;