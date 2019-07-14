import React from 'react';

function SlideShow (){
    return (
      <section id="slideslow-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="slideshowcontent">
                <div className="display-table">
                  <div className="display-table-cell">
                    <h1>BOOK A CAR TODAY!</h1>
                    <p>FOR AS LOW AS $10 A DAY PLUS 15% DISCOUNT <br /> FOR OUR RETURNING CUSTOMERS</p>
                    <div className="book-ur-car">
                      <form action="index2.html">
                        <div className="pick-location bookinput-item">
                          <select className="custom-select">
                            <option selected>Pick Location</option>
                            <option value={1}>Dhaka</option>
                            <option value={2}>Comilla</option>
                            <option value={3}>Barishal</option>
                            <option value={3}>Rangpur</option>
                          </select>
                        </div>
                        <div className="pick-date bookinput-item">
                          <input id="startDate2" placeholder="Pick Date" />
                        </div>
                        <div className="retern-date bookinput-item">
                          <input id="endDate2" placeholder="Return Date" />
                        </div>
                        <div className="car-choose bookinput-item">
                          <select className="custom-select">
                            <option selected>Choose Car</option>
                            <option value={1}>BMW</option>
                            <option value={2}>Audi</option>
                            <option value={3}>Lexus</option>
                          </select>
                        </div>
                        <div className="bookcar-btn bookinput-item">
                          <button type="submit">Book Car</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default SlideShow;