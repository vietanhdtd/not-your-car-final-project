import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import NavBar from './components/navBar'
import SlideShow from './components/sildeShow'
import ChooseCar from './components/chooseCar'
import Footer from './components/footer'
import Register from './components/register'
import PostForm from './components/createPost'


const Home = () => {
  return (
    <div>
      <SlideShow />
      <ChooseCar />
    </div>
  )
}

const registerPage = () => {
  return (
    <Register />
  )
}

const postPage = () => {
  return (
    <PostForm />
  )
}

function App() {
  return (
    <Router className="App">
      <NavBar />
      <Route path="/" exact component={(props) => <Home {...props}/> } />
      <Route path="/register" component = {registerPage} />
      <Route path="/createpost" component = {postPage} />
      <Footer />
    </Router>
  );
}

export default App;
