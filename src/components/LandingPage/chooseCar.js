import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
// reactstrap components
import { Container, Row, Col, Card, CardImg, CardBody, CardText } from "reactstrap";

// core components


function ChooseCar(props) {
  const [listCar, setListCar] = useState([])
  useEffect(() => {
    setListCar(props.listCar)
  },[])
  return (
    <>
      <div className="section">
        <Container>
            <Row className="my-2"><h2 className="title mx-auto">choose your car</h2></Row>
          <Col>
            <Row className="w-100 d-flex flex-wrap">
                {listCar.slice(0,6).map(car => {
                  return (
                    <Card style={{width: '20rem'}} className="mx-auto">
                  <CardImg top src={car.img} alt="cx-5" />
                  <CardBody>
                      <CardText>{car.description} {car.id}</CardText>
                  </CardBody>
                </Card>
                  )
                })}
            </Row>
                <Link to="/allcars">View More</Link>
          </Col>
        </Container>
      </div>
    </>
  );
}

export default ChooseCar;
