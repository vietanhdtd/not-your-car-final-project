import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import NavBar from './components/navBar'
import IndexHeader from './components/header'
import ChooseCar from './components/chooseCar'
import Footer from './components/footer'
import RegisterPage from './components/register'
import PostForm from './components/createPost'
import Login  from './components/login'
import NucleoIcons  from './components/NucleoIcons'
import ProfilePage  from './components/ProfilePage'

const Home = () => {
  return (
    <div>
      <IndexHeader />
      <ChooseCar />
    </div>
  )
}

function App() {
  return (
    <Router className="App">
      <NavBar />
      <Switch>
      <Route path="/" exact component={(props) => <Home {...props}/> } />
      <Route path="/register" component = {RegisterPage} />
      <Route path="/icon" component = {NucleoIcons} />
      <Route path="/profile" component = {ProfilePage} />
      <Route path="/createpost" component = {PostForm} />
      <Route path="/login" component = {Login} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
