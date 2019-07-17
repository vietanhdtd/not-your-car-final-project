import React, { useState, useEffect } from "react";

// reactstrap components
import { Container, Row, Col, Card, CardImg, CardBody, CardText } from "reactstrap";

// core components


function ChooseCar() {
  const [listCar, setListCar] = useState([])
  
  const getCars = async () => {
    const response = await fetch('https://127.0.0.1:5000/cars')
    const jsonData = await response.json()
    setListCar(jsonData)
  }
  console.log(listCar)

  useEffect(() => {
    getCars()
  }, [])
  
  return (
    <>
      <div className="section">
        <Container>
          <Col>
            <h2 className="title">choose your car</h2>
            <Col className="w-100 d-flex flex-wrap">
                {listCar.map(car => {
                  return (
                    <Card style={{width: '20rem'}} className="mx-auto">
                  <CardImg top src={car.img} alt="cx-5" />
                  <CardBody>
                      <CardText>{car.description}</CardText>
                  </CardBody>
                </Card>
                  )
                })}
            </Col>
          </Col>
        </Container>
      </div>
    </>
  );
}

export default ChooseCar;
