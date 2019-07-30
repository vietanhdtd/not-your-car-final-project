import React, { useEffect, useState } from "react";
import classnames from "classnames";
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserAstronaut, faPlusSquare } from '@fortawesome/free-solid-svg-icons'


function NavBar(props) {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarBrandColor, setNavbarBrandColor] = useState("text-white h6");
  const [navbarCollapse, setNavbarCollapse] = useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
  
  const logOut = async (e) => {
    e.preventDefault();
    window.location.replace('https://notyourcar.netlify.com')
    localStorage.clear();
    await fetch('https://not-your-car.herokuapp.com/logout', {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      }
    });
  };
  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 200 ||
        document.body.scrollTop > 200
      ) {
        setNavbarColor("");
        setNavbarBrandColor("text-dark h3");
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
          <NavbarBrand data-placement="bottom" title="Coded by VietAnhNguyen">
            <a
              href="/"
              className={classnames("font-weight-bold", navbarBrandColor)}
            >
              not your car
            </a>
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
              {props.isLoggin ? (
                <>
                <NavItem>
                  <NavLink
                    color="neutral"
                    tag={Link}
                    to="/rentout"
                  >
                    Rent Out a Car  <FontAwesomeIcon icon={faPlusSquare}/>
                  </NavLink>
                  </NavItem>
                  <NavItem>

                  <NavLink
                    tag={Link}
                    to="/profile"
                    >
                    {props.userInfo.user_name} <FontAwesomeIcon icon={faUserAstronaut}/>
                  </NavLink>
                    </NavItem>
                    <NavItem>
                  <NavLink
                  href="/"
                  onClick={(e) => logOut(e)}
                  >
                    Log Out <FontAwesomeIcon icon={faSignOutAlt}/>
                  </NavLink>
                  </NavItem></>
              ) : (
                <>
                <NavItem> 
                  <Button
                    tag={Link}
                    to="/register"
                    className="btn btn-danger btn-round" 
                  >
                    register
                  </Button>
                </NavItem>
                <NavItem> 
                  <Button
                    tag={Link}
                    className="btn btn-warning btn-round text-dark" 
                    to="/login"
                  >
                    login
                </Button>
                </NavItem>
                </>
              )}
            
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
