import React from 'react'

function PostForm () {
    return (
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
                  </form>
                </div>
                    <div className="log-btn">
                      <button type="submit"><i className="fa fa-check-square" /> Sign Up</button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default PostForm;