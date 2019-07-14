import React from 'react'

function Register () {
    return (
        <div>
    <section id="page-title-area" className="section-padding overlay">
        <div className="container">
          <div className="row">
            {/* Page Title Start */}
            <div className="col-lg-12">
              <div className="section-title  text-center">
                <h2>SIGN UP</h2>
                <span className="title-line"><i className="fa fa-car" /></span>
                <p>sign up now to rent a car</p>
              </div>
            </div>
            {/* Page Title End */}
          </div>
        </div>
      </section>
        <section id="lgoin-page-wrap" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 m-auto">
              <div className="login-page-content">
                <div className="login-form">
                  <form action="index.html">
                    <div className="name">
                      <div className="row">
                        <div className="col-md-6">
                          <input type="text" placeholder="First Name" />
                        </div>
                        <div className="col-md-6">
                          <input type="text" placeholder="Last Name" />
                        </div>
                      </div>
                    </div>
                    <div className="username">
                      <input type="email" placeholder="Email" />
                    </div>
                    <div className="username">
                      <input type="text" placeholder="Username" />
                    </div>
                    <div className="password">
                      <input type="password" placeholder="Password" />
                    </div>
                    <div className="log-btn">
                      <button type="submit"><i className="fa fa-check-square" /> Sign Up</button>
                    </div>
                  </form>
                </div>
                <div className="login-other">
                  <span className="or">or</span>
                  <a href="#" className="login-with-btn facebook"><i className="fa fa-facebook" /> Signup With Facebook</a>
                  <a href="#" className="login-with-btn google"><i className="fa fa-google" /> Signup With Google</a>
                </div>
                <div className="create-ac">
                  <p>Have an account? <a href="login.html">Sign In</a></p>
                </div>
                <div className="login-menu">
                  <a href="about.html">About</a>
                  <span>|</span>
                  <a href="contact.html">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}

export default Register;