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

function NavBar() {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarBrandColor, setNavbarBrandColor] = useState("text-white h6");
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [data, setData] = useState({});
  const [isLoggin, setIsLoggin] = useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const getWithToken = async path => {
    await fetch(`https://127.0.0.1:5000/${path}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    })
      .then(data => data.json())
      .then(resp => {
        setData(resp);
        setIsLoggin(resp.success);
      });
  };
  console.log(data);
  console.log("api", data.success);
  console.log(isLoggin);

  const logOut = async path => {
    await fetch(`https://127.0.0.1:5000/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    });
    sessionStorage.clear();

  };

  useEffect(() => {
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;
    sessionStorage.setItem("token", accessToken);
    console.log("token", sessionStorage.getItem("token"));
    getWithToken("user_profile");
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
            <Link
              to="/"
              className={classnames("font-weight-bold", navbarBrandColor)}
            >
              not your car
            </Link>
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
              {isLoggin ? (
              <UncontrolledDropdown nav>
                <DropdownToggle
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={e => e.preventDefault()}
                >
                    {data.user_name}
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                  <DropdownItem
                  
                  >
                    <Link to="/createpost">Create Post</Link>
                  </DropdownItem>
                  <DropdownItem
                  >
                    <Link to="/profile">Profile</Link>
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={() => logOut("logout")}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              ) : (
                <>
                <NavItem> 
                  <Link
                    to="/register"
                    class="btn btn-danger btn-round" 
                  >
                    register
                  </Link>
                </NavItem>
                <NavItem> 
                  <Link
                    class="btn btn-warning btn-round" 
                    to="/login"
                  >
                    login
                </Link>
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
