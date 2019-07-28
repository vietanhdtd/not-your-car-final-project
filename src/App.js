import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import NavBar from "./components/LandingPage/NavBar";
import IndexHeader from "./components/LandingPage/Header";
import ChooseCar from "./components/LandingPage/ChooseCar";
import Footer from "./components/LandingPage/Footer";
import RegisterPage from "./components/Form/Register";
import CreatePost from "./components/Form/CreatePost";
import EditCar from "./components/Form/EditCar";
import Login from "./components/Form/Login";
import BookingCar from "./components/BookingCar";
import ProfilePage from "./components/ProfilePage";
import ViewSingleCar from "./components/ViewSingleCar";
import AllCars from "./components/AllCars";
import LandingPage from "./components/LandingPage/Template";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";

const Home = props => {
  return (
    <div>
      <IndexHeader {...props} />
      <LandingPage />
      <ChooseCar {...props} />
    </div>
  );
};

const override = css`
  display: block;
  margin: auto;
  content: url(${require("assets/img/loading-car.gif")});
`;

function App(props) {
  const [listCar, setListCar] = useState([]);
  const [availableCar, setAvailableCar] = useState([]);
  const [checkingInfo, setCheckingInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isLoggin, setIsLoggin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCars = async () => {
    const response = await fetch("https://127.0.0.1:5000/cars");
    const jsonData = await response.json();
    setListCar(jsonData);
    setLoading(true);
  };

  const checkAvailable = async booking => {
    const response = await fetch("https://127.0.0.1:5000/check_available", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
    });
    const jsonData = await response.json();
    setAvailableCar(jsonData);
    setCheckingInfo(booking);
    setCheck(true);
    setLoading(true);
  };

  console.log(availableCar);

  const getUserInfo = async () => {
    const response = await fetch("https://127.0.0.1:5000/user_profile", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`
      }
    });
    const jsonData = await response.json();
    setUserInfo(jsonData);
    setLoading(true);
  };

  const getBookingDate = async () => {
    const response = await fetch("https://127.0.0.1:5000/get_booking_datetime", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`
      },
      body: JSON.stringify()
    });
    const jsonData = await response.json();
    setUserInfo(jsonData);
    setLoading(true);
  };

  const existingToken = localStorage.getItem("token");
  const accessToken =
    window.location.search.split("=")[0] === "?access_token"
      ? window.location.search.split("=")[1]
      : null;
  useEffect(() => {
    if (!accessToken && !existingToken) {
      setIsLoggin(false);
    }
    if (accessToken) {
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      setIsLoggin(true);
    }
    if (existingToken) {
      setToken(existingToken);
      setIsLoggin(true);
    }
  }, []);

  useEffect(() => {
    getUserInfo();
    getCars();
  }, [isLoggin]);

  if (!loading) {
    return (
      <div
        style={{ display: "flex", marginTop: 350}}
      >
        <BeatLoader
          css={override}
          sizeUnit={"px"}
          size={20}
          color={"black"}
          loading={!loading}
        />
      </div>
    );
  }

  return (
    <Router className="App">
      <NavBar userInfo={userInfo} isLoggin={isLoggin} />
      <Switch>
        <Route
          path="/"
          exact
          component={props =>
            check ? (
              <Redirect to="/bookingcar" />
            ) : (
              <Home
                {...props}
                listCar={listCar}
                checkAvailable={checkAvailable}
              />
            )
          }
        />
        <Route path="/register" component={RegisterPage} />
        <Route
          path="/bookingcar"
          component={() => (
            <BookingCar
              availableCar={availableCar}
              checkAvailable={checkAvailable}
              checkingInfo={checkingInfo}
            />
          )}
        />
        <PrivateRoute
          path="/profile"
          component={() => <ProfilePage userInfo={userInfo} />}
        />
        <PrivateRoute path="/createpost" component={CreatePost} />
        <Route path="/login" component={Login} />
        <PrivateRoute
          path="/allcars/:id"
          exact
          component={props => (
            <ViewSingleCar
              listCar={listCar}
              {...props}
              checkingInfo={checkingInfo}
            />
          )}
        />
        <Route
          path="/allcars"
          component={props => <AllCars {...props} listCar={listCar} />}
        />

        <PrivateRoute
          path="/edit_car/:id"
          component={props => <EditCar {...props} listCar={listCar} />}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
