import React, { useEffect, useState } from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";
import { Link } from 'react-router-dom'



function NavBar () {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarBrandColor, setNavbarBrandColor] = useState("text-white");
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [data, setData ] = useState({})
  const [isLoggin, setIsLoggin ] = useState(false)

  
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  }
  
  const getWithToken = async (path) => {
    await fetch(
        `https://127.0.0.1:5000/${path}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }
    )
    .then(data => data.json())
    .then(resp => {setData(resp); setIsLoggin(resp.success)})
  }  
  console.log(data)
  console.log("api",data.success)
  console.log(isLoggin)
  
  const logOut = async (path) => {
    await fetch(
      `https://127.0.0.1:5000/${path}`,
      {
          method: 'POST',
          headers: {
              'Authorization': `Token ${sessionStorage.getItem('token')}`
          }
      }
    )
      sessionStorage.clear()
  }


  useEffect(() => {
    const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1] : null;
    sessionStorage.setItem('token', accessToken);
    console.log("token",sessionStorage.getItem('token'))
    getWithToken('user_profile')
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
        setNavbarBrandColor("text-dark");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
        setNavbarBrandColor("text-white");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, []);
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            title="Coded by VietAnhNguyen"
          >
            <Link to="/" className={classnames("font-weight-bold", navbarBrandColor)}>not your car</Link>
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              { isLoggin ? <NavLink>{ data.user_name }</NavLink> :
              <Button
                className="btn-round"
                color="danger"
                target="_blank"
              >
                <Link to="/register" style={{color: "white", fontWeight: "bolder"}}>register</Link>
              </Button>}
            </NavItem>
            <NavItem>
              <Button
                className="btn-round"
                color="warning"
                onClick={() => logOut('logout')}
                target="_blank"
              >
              logout
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar ;
