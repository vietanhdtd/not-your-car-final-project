import React, { useState } from "react";
import { Link } from 'react-router-dom'
// reactstrap components
import { Container, 
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
    TabPane
} from "reactstrap";


function AllCars(props) {
  const [listCar, setListCar] = useState([])
  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  console.log(props)
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    setListCar(props.listCar)
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  },[]);
  return (
    <div>  
    <div
    className="all-car-header d-flex align-items-end justify-content-center mb-4"
    style={{
        backgroundImage: "url(" + require("assets/img/allCar_header.png") + ")",
        backgroundSize:"cover",
        backgroundRepeat: "no-repeat"
    }}
    >
    <Row className="my-5"><h1 className="title mx-auto text-white">Choose Your Car</h1></Row>
    </div>
    <Container>
        <Col className="my-5">
            <div className="nav-tabs-navigation m-5">
            <div className="nav-tabs-wrapper">
                <Nav id="tabs" role="tablist" tabs>
                <NavItem>
                    <NavLink
                    className={activeTab === "1" ? "active font-weight-bold" : ""}
                    onClick={() => {
                        toggle("1");
                    }}
                    >
                    All Cars
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={activeTab === "2" ? "active font-weight-bold" : ""}
                    onClick={() => {
                        toggle("2");
                    }}
                    >
                    Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={activeTab === "3" ? "active font-weight-bold" : ""}
                    onClick={() => {
                        toggle("3");
                    }}
                    >
                    Messages
                    </NavLink>
                </NavItem>
                </Nav>
            </div>
            </div>
            <TabContent activeTab={activeTab} className="text-center">
            <TabPane tabId="1">
            <Col className="w-100 d-flex flex-wrap">
                    {listCar.reverse().map(car => {
                        return (
                        <Link to={`/allcars/${car.id}`} className="mx-auto">
                        <Card style={{width: '20rem', height: '20rem'}}>
                        <CardImg top src={car.img} alt="cx-5" />
                        <CardBody>
                            <CardText>{car.description}</CardText>
                            <CardText>{car.id}</CardText>
                        </CardBody>
                    </Card>
                    </Link>
                        )
                    })}
                </Col>
            </TabPane>
            <TabPane tabId="2">
                <p>Here is your profile.</p>
            </TabPane>
            <TabPane tabId="3">
                <p>Here are your messages.</p>
            </TabPane>
            </TabContent>
        </Col>
        </Container>
            </div>
  );
}

export default AllCars;
