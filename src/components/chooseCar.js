import React from 'react'



function ChooseCar () {
    return(

<section id="choose-car" className="section-padding">
        <div className="container">
          <div className="row">
            {/* Section Title Start */}
            <div className="col-lg-12">
              <div className="section-title  text-center">
                <h2>Choose your Car</h2>
                <span className="title-line"><i className="fa fa-car" /></span>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
            </div>
            {/* Section Title End */}
          </div>
          <div className="row">
            {/* Choose Area Content Start */}
            <div className="col-lg-12">
              <div className="choose-ur-cars">
                <div className="row">
                  <div className="col-lg-3">
                    {/* Choose Filtering Menu Start */}
                    <div className="home2-car-filter">
                      <a href="#" data-filter="*" className="active">all</a>
                      <a href="#" data-filter=".con">Conver</a>
                      <a href="#" data-filter=".hat">Truck</a>
                      <a href="#" data-filter=".mpv">MPV</a>
                      <a href="#" data-filter=".sedan">Sedan</a>
                      <a href="#" data-filter=".suv">SUV</a>
                    </div>
                    {/* Choose Filtering Menu End */}
                  </div>
                  <div className="col-lg-9">
                    {/* Choose Cars Content-wrap */}
                    <div className="row popular-car-gird">
                      {/* Single Popular Car Start */}
                      <div className="col-lg-6 col-md-6 con suv mpv">
                        <div className="single-popular-car">
                          <div className="p-car-thumbnails">
                            <a className="car-hover" href="assets/img/car/car-1.jpg">
                              <img src="assets/img/car/car-1.jpg" alt="JSOFT" />
                            </a>
                          </div>
                          <div className="p-car-content">
                            <h3>
                              <a href="#">Dodge Ram 1500</a>
                              <span className="price"><i className="fa fa-tag" /> $55/day</span>
                            </h3>
                            <h5>HATCHBACK</h5>
                            <div className="p-car-feature">
                              <a href="#">2017</a>
                              <a href="#">manual</a>
                              <a href="#">AIR CONDITION</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Single Popular Car End */}
                      {/* Single Popular Car Start */}
                      <div className="col-lg-6 col-md-6 hat sedan">
                        <div className="single-popular-car">
                          <div className="p-car-thumbnails">
                            <a className="car-hover" href="assets/img/car/car-2.jpg">
                              <img src="assets/img/car/car-2.jpg" alt="JSOFT" />
                            </a>
                          </div>
                          <div className="p-car-content">
                            <h3>
                              <a href="#">Dodge Ram 1500</a>
                              <span className="price"><i className="fa fa-tag" /> $55/day</span>
                            </h3>
                            <h5>HATCHBACK</h5>
                            <div className="p-car-feature">
                              <a href="#">2017</a>
                              <a href="#">manual</a>
                              <a href="#">AIR CONDITION</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Single Popular Car End */}
                      {/* Single Popular Car Start */}
                      <div className="col-lg-6 col-md-6 suv con mpv">
                        <div className="single-popular-car">
                          <div className="p-car-thumbnails">
                            <a className="car-hover" href="assets/img/car/car-3.jpg">
                              <img src="assets/img/car/car-3.jpg" alt="JSOFT" />
                            </a>
                          </div>
                          <div className="p-car-content">
                            <h3>
                              <a href="#">Dodge Ram 1500</a>
                              <span className="price"><i className="fa fa-tag" /> $55/day</span>
                            </h3>
                            <h5>HATCHBACK</h5>
                            <div className="p-car-feature">
                              <a href="#">2017</a>
                              <a href="#">manual</a>
                              <a href="#">AIR CONDITION</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Single Popular Car End */}
                      {/* Single Popular Car Start */}
                      <div className="col-lg-6 col-md-6 con hat">
                        <div className="single-popular-car">
                          <div className="p-car-thumbnails">
                            <a className="car-hover" href="assets/img/car/car-4.jpg">
                              <img src="assets/img/car/car-4.jpg" alt="JSOFT" />
                            </a>
                          </div>
                          <div className="p-car-content">
                            <h3>
                              <a href="#">Dodge Ram 1500</a>
                              <span className="price"><i className="fa fa-tag" /> $55/day</span>
                            </h3>
                            <h5>HATCHBACK</h5>
                            <div className="p-car-feature">
                              <a href="#">2017</a>
                              <a href="#">manual</a>
                              <a href="#">AIR CONDITION</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Single Popular Car End */}
                    </div>
                    {/* Choose Cars Content-wrap */}
                  </div>
                </div>
              </div>
            </div>
            {/* Choose Area Content End */}
          </div>
        </div>
      </section>
    )
}

export default ChooseCar;