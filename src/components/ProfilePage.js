import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardText,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Badge,
  Row,
  CardLink,
  Col,
  Modal,
  Alert
} from "reactstrap";
import moment from "moment";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar,faCoins, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import Footer from "./LandingPage/Footer";
import ImgUpload from './ImageUpload'


function ProfilePage(props) {
  const [listCar, setListCar] = useState([]);
  const [alertData, setAlertData] = useState({});
  const [bookedList, setBookedList] = useState([]);
  const [modalDecline, setModalDecline] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalCheckout, setModalCheckout] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [alert, setAlert] = useState(false);
  const [bookingID, setBookingID] = useState("");
  const [carID, setCarID] = useState("");
  const [bill, setBill] = useState({});
  const [isCheckout, setIsCheckout] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rate, setRate] = useState();
  const [image, setImage] = useState();
  let pageHeader = React.createRef();

  console.log(props);
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const getUserCar = async () => {
    const response = await fetch("https://not-your-car.herokuapp.com/get_user_car", {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });
    const jsonData = await response.json();
    setListCar(jsonData);
  };
  const getUserBooking = async () => {
    const response = await fetch("https://not-your-car.herokuapp.com/get_user_booking", {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });
    const jsonData = await response.json();
    setBookedList(jsonData);
  };
  console.log("saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00", bookedList);

  const toggleModalDecline = (id, id2) => {
    setBookingID(id);
    setCarID(id2);
    setModalDecline(!modalDecline);
  };

  const toggleModalConfirm = (id, id2) => {
    setBookingID(id);
    setCarID(id2);
    setModalConfirm(!modalConfirm);
  };

  const handleImageUrl = async (img_url) => {
    setImage(img_url)
}

const handleUploadImage = async () => {
  const response = await fetch("https://not-your-car.herokuapp.com/upload_profile", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({image_url: image})
    });
    const jsonData = await response.json()
    console.log(jsonData)
    setModalDecline(!modalDecline);
}

  const toggleModalCheckout = (id, id2) => {
    setBookingID(id);
    setCarID(id2);
    setModalCheckout(!modalCheckout);
  };

  const onDismiss = () => {
    setAlert(!alert);
  };

  const handleStar = (e) => {
      setRate(e)
  }
  const handleRating = async () => {
    console.log(rate);
    const response = await fetch("https://not-your-car.herokuapp.com/rating", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rate: rate, car_id: carID })
    });
    setModalCheckout(!modalCheckout);
  };

  const declineBooking = async () => {
    const response = await fetch("https://not-your-car.herokuapp.com/decline_booking", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ booking_id: bookingID, car_id: carID })
    });
    const jsonData = await response.json();
    console.log(jsonData);
    window.scrollTo(0, 0);
    setAlertData(jsonData);
    setModalDecline(!modalDecline);
    onDismiss();
    getUserBooking();
  };

  const confirmBooking = async () => {
    const response = await fetch("https://not-your-car.herokuapp.com/confirm_booking", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ booking_id: bookingID, car_id: carID })
    });
    const jsonData = await response.json();
    console.log(jsonData);
    window.scrollTo(0, 0);
    setAlertData(jsonData);
    setModalConfirm(!modalConfirm);
    onDismiss();
    getUserBooking();
  };

  const checkoutBooking = async () => {
    const response = await fetch("https://not-your-car.herokuapp.com/checkout_booking", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ booking_id: bookingID, car_id: carID })
    });
    const jsonData = await response.json();
    console.log(jsonData);
    setBill(jsonData);
    setIsCheckout(true);
    getUserBooking();
  };


  const handleDelete = async (id) => {
    console.log(id)
    const response = await fetch("https://not-your-car.herokuapp.com/delete_car", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({car_id: id })
    });
    const jsonData = await response.json();
    console.log(jsonData);
  }

  document.documentElement.classList.remove("nav-open");

  useEffect(() => {
    window.scrollTo(0, 0);
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
    };
  });

  useEffect(() => {
    getUserBooking();
    getUserCar();
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/profile-img.png") + ")"
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
            <Col sm="4">
              <div className="owner">
                <div className="avatar">
                  <img
                    alt="..."
                    className="img-circle img-no-padding img-responsive"
                    src={props.userInfo.profile_image || require("assets/img/ryan.jpg")}
                  />
                </div>
                <div className="name">
                  <h4 className="title">
                    {props.userInfo.user_name}
                    <br />
                  </h4>
                  <h6 className="description">{props.userInfo.email}</h6>
                </div>
              </div>
              <Row>
                <Col className="ml-auto mr-auto text-center" md="6">
                  <Button className="btn-round" color="default" onClick={() => {setIsEdit(true);toggleModalDecline()}} outline>
                    <i className="fa fa-cog" /> Edit profile
                  </Button>
                </Col>
              </Row>
            </Col>
            <br />
            <Col className="mt-4">
              <div className="nav-tabs-navigation">
                <Alert color="success" isOpen={alert} toggle={onDismiss}>
                  <b>{alertData.result}</b>
                </Alert>
                <div className="nav-tabs-wrapper">
                  <Nav role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        <a href="#" style={{ color: "black" }}>
                          booked car
                        </a>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        <a href="#" style={{ color: "black" }}>
                          car for rent
                        </a>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        <a href="#" style={{ color: "black" }}>
                          history
                        </a>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
              {/* Tab panes */}
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1" id="follows">
                  <Col className="w-100 d-flex flex-wrap">
                    {bookedList
                      .sort()
                      .filter(i => i.booking_status != "Done")
                      .map(book => {
                        return (
                          <Card style={{ width: "20rem" }} className="mx-auto">
                            <CardImg top src={book.cars.img} alt="cx-5" />
                            <CardBody>
                              <h6>
                                {book.cars.brand_name} {book.cars.model}
                              </h6>
                              <CardText>
                                status:{" "}
                                <Badge
                                  color={
                                    book.booking_status === "Waiting"
                                      ? "warning"
                                      : "danger"
                                  }
                                  className="text-dark"
                                  pill
                                >
                                  {book.booking_status}
                                </Badge>
                              </CardText>
                              <CardText>
                                <h6>From:</h6>
                                {moment
                                  .utc(book.pick_date)
                                  .format("MMMM Do YYYY, HH:mm")}
                                <h6>To:</h6>
                                {moment
                                  .utc(book.return_date)
                                  .format("MMMM Do YYYY, HH:mm")}
                              </CardText>
                              <CardText>
                                {book.booking_status == "Waiting" ? (
                                  <>
                                    <Button
                                      className="btn-round"
                                      color="warning"
                                      onClick={() =>
                                        toggleModalConfirm(
                                          book.booking_id,
                                          book.cars.id
                                        )
                                      }
                                    >
                                      Confirm
                                    </Button>
                                    <Button
                                      className="btn-round"
                                      color="neutral"
                                      onClick={() =>
                                        toggleModalDecline(
                                          book.booking_id,
                                          book.cars.id
                                        )
                                      }
                                    >
                                      Decline
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    className="btn-round"
                                    color="danger"
                                    onClick={() =>
                                      toggleModalCheckout(
                                        book.booking_id,
                                        book.cars.id
                                      )
                                    }
                                  >
                                    Checkout
                                  </Button>
                                )}
                              </CardText>
                            </CardBody>
                          </Card>
                        );
                      })}
                  </Col>
                </TabPane>
                <TabPane className="text-center" tabId="2" id="following">
                  <Col className="w-100 d-flex flex-wrap">
                    {listCar.sort().map(car => {
                      return (
                        <Card style={{ width: "20rem" }} className="mx-auto">
                          <CardImg top src={car.img} alt="cx-5" />
                          <CardBody>
                            <h6>
                              {car.brand_name} {car.model}
                            </h6>
                            <CardText>
                              status:{" "}
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
                            </CardText>
                            <CardText>
                              {car.description} {car.id}
                            </CardText>
                            <Button
                              // to={`/edit_car/${car.id}`}
                              className="mx-auto"
                              // key={car.id}
                              onClick={() => handleDelete(car.id)}
                            >
                              edit
                            </Button>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </Col>
                </TabPane>
                <TabPane className="text-center" tabId="3" id="history">
                  <Col className="w-100 d-flex flex-wrap">
                    {bookedList
                      .sort()
                      .filter(i => i.booking_status === "Done")
                      .map(book => {
                        return (
                          <Card style={{ width: "20rem" }} className="mx-auto">
                            <CardImg top src={book.cars.img} alt="cx-5" />
                            <CardBody>
                              <h6>
                                {book.cars.brand_name} {book.cars.model}
                              </h6>
                              <CardText>
                                status:{" "}
                                <Badge color="info" className="text-dark" pill>
                                  {book.booking_status}
                                </Badge>
                              </CardText>
                              <CardText>
                                <h6>From:</h6>
                                {moment
                                  .utc(book.pick_date)
                                  .format("MMMM Do YYYY, HH:mm")}
                                <h6>To:</h6>
                                {moment
                                  .utc(book.return_date)
                                  .format("MMMM Do YYYY, HH:mm")}
                              </CardText>
                              {/* <CardText>
                                <Button
                                  className="btn-round"
                                  color="info"
                                  onClick={() =>
                                    (
                                      book.booking_id,
                                      book.cars.id
                                    )
                                  }
                                >
                                  View
                                </Button>
                              </CardText> */}
                            </CardBody>
                          </Card>
                        );
                      })}
                  </Col>
                </TabPane>
              </TabContent>
              <Modal isOpen={modalDecline} toggle={() => toggleModalDecline()}>
                  {isEdit ? (
                  <>
                    <div className="modal-header">
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={toggleModalDecline}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    Choose your Image
                  </h5>
                </div>
                <div className="modal-body">
                <ImgUpload
                      handleImageUrl={(img_url) => handleImageUrl(img_url)}
                    />
                </div>
                <div className="modal-footer">
                  <div className="left-side">
                    <Button
                      className="btn-link"
                      color="default"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => handleUploadImage()}
                    >
                      Confirm
                    </Button>
                  </div>
                  <div className="divider" />
                  <div className="right-side">
                    <Button
                      className="btn-link"
                      color="danger"
                      type="button"
                      onClick={() => toggleModalDecline()}
                    >
                      Cancel
                    </Button>
                  </div></div>
                  </>) : (
                    <>
                    <div className="modal-header">
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={toggleModalDecline}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    Notice
                  </h5>
                </div>
                <div className="modal-body">
                  <p>
                    This car will be available again and everyone can book it
                    after you decline.
                  </p>
                </div>
                <div className="modal-footer">
                  <div className="left-side">
                    <Button
                      className="btn-link"
                      color="default"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => declineBooking()}
                    >
                      Confirm
                    </Button>
                  </div>
                  <div className="divider" />
                  <div className="right-side">
                    <Button
                      className="btn-link"
                      color="danger"
                      type="button"
                      onClick={() => toggleModalDecline()}
                    >
                      Cancel
                    </Button>
                  </div>
                  </div>
                  </>)}
              </Modal>
              <Modal isOpen={modalConfirm} toggle={() => toggleModalConfirm()}>
                <div className="modal-header">
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={toggleModalConfirm}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    Notice
                  </h5>
                </div>
                <div className="modal-body">
                  <p>Make sure you check all the information before confirm.</p>
                </div>
                <div className="modal-footer">
                  <div className="left-side">
                    <Button
                      className="btn-link"
                      color="default"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => confirmBooking()}
                    >
                      Confirm
                    </Button>
                  </div>
                  <div className="divider" />
                  <div className="right-side">
                    <Button
                      className="btn-link"
                      color="danger"
                      type="button"
                      onClick={() => toggleModalConfirm()}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Modal>
              <Modal
                isOpen={modalCheckout}
                id="modalCheckout"
                toggle={() => toggleModalCheckout()}
              >
                <div className="modal-header">
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={toggleModalCheckout}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    Notice
                  </h5>
                </div>
                {isCheckout ? (
                  <>
                    <div className="modal-body">
                      <Col className='d-flex justify-content-center'><Rating
                        initialRating={rate}
                        onClick={rate => {handleStar(rate)}}
                        emptySymbol={
                          <FontAwesomeIcon
                            icon={faStar}
                            color="#f5f5f0"
                            size="3x"
                          />
                        }
                        fullSymbol={
                          <FontAwesomeIcon
                            icon={faStar}
                            color="#fabd3c"
                            size="3x"
                          />
                        }
                      /></Col>
                      <Col className='text-center mt-4'><h5>Thank you for using our servies</h5></Col>
                      <Col  className='text-center mt-4'> <h4>it's <FontAwesomeIcon icon={faDollarSign}/>{bill.total_bill} total in {bill.rental_time} days</h4></Col>
                    </div>
                    <div className="modal-footer">
                      <div className="left-side">
                        <Button
                          className="btn-link"
                          color="danger"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => handleRating()}
                        >
                          Rate
                        </Button>
                      </div>
                      <div className="divider" />
                      <div className="right-side">
                        <Button
                          className="btn-link"
                          color="default"
                          type="button"
                          onClick={() => toggleModalCheckout()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="modal-body">
                      <p> Do you want to checkout right now? </p>
                      <p> The bill will be generated after you hit confirm </p>
                    </div>
                    <div className="modal-footer">
                      <div className="left-side">
                        <Button
                          className="btn-link"
                          color="danger"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => checkoutBooking()}
                        >
                          Confirm
                        </Button>
                      </div>
                      <div className="divider" />
                      <div className="right-side">
                        <Button
                          className="btn-link"
                          color="default"
                          type="button"
                          onClick={() => toggleModalCheckout()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer/>
    </>
  );
}

export default ProfilePage;

