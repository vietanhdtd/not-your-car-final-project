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
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import { Link } from "react-router-dom";

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
    window.location.replace('http://localhost:3000')
    localStorage.clear();
    await fetch('https://127.0.0.1:5000/logout', {
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
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
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
                    to="/createpost"
                  >
                    Rent Out a Car +
                  </NavLink>
                  </NavItem>
                  <NavItem>

                  <NavLink
                    tag={Link}
                    to="/profile"
                    >
                    {props.userInfo.user_name} <i className="nc-icon nc-single-02" />
                  </NavLink>
                    </NavItem>
                    <NavItem>
                  <NavLink
                  href="/"
                  onClick={(e) => logOut(e)}
                  >
                    Log Out
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
