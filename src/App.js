import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import NavBar from './components/LandingPage/navBar'
import IndexHeader from './components/LandingPage/header'
import ChooseCar from './components/LandingPage/chooseCar'
import Footer from './components/LandingPage/footer'
import RegisterPage from './components/Form/register'
import PostForm from './components/Form/createPost'
import Login  from './components/Form/login'
import NucleoIcons  from './components/NucleoIcons'
import ProfilePage  from './components/ProfilePage'
import ViewSingleCar  from './components/ViewSingleCar'
import AllCars  from './components/allCars'

const Home = (props) => {
  console.log(props)
  return (
    <div>
      <IndexHeader {...props} />
      <ChooseCar {...props}/>
    </div>
  )
}

function App() {
  const [listCar, setListCar] = useState([])
  const [availableCar, setAvailableCar] = useState([])
  
  const getCars = async () => {
    const response = await fetch('https://127.0.0.1:5000/cars')
    const jsonData = await response.json()
    setListCar(jsonData)
  }
  console.log(listCar)

  const checkAvailable = async (booking) => {
    console.log(booking)
    const response = await fetch(`https://127.0.0.1:5000/check`, {
      method: "POST",
      headers: {
        'Authorization': `Token ${sessionStorage.getItem("token")}`,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking)   
      })
    const jsonData = await response.json()
    setAvailableCar(jsonData)
    }
    console.log(availableCar)

  useEffect(() => {
    getCars()
  }, [])

  return (
    <Router className="App">
      <NavBar />
      <Switch>
      <Route path="/" exact component={(props) => <Home {...props} listCar = {listCar} checkAvailable = {checkAvailable} /> } />
      <Route path="/register" component = {RegisterPage} />
      <Route path="/icon" component = {NucleoIcons} />
      <Route path="/profile" component = {ProfilePage} />
      <Route path="/createpost" component = {PostForm} />
      <Route path="/login" component = {Login} />
      <Route path="/allcars/:id" exact component = {(props) => <ViewSingleCar listCar={listCar} {...props}/>} />
      <Route path="/allcars" component = {(props) => <AllCars {...props} listCar = {listCar}/> }/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
