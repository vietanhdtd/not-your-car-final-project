import React, { useState, useEffect } from "react";
import { Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
  Modal,Card } from "reactstrap";

import  useForm from './useForm'
import validate from '../ValidateRules/CreatePostValidateRules';

function EditCar(props) {
  const [carInfo, setCarInfo] = useState({})
  const [modal, setModal] = useState(false);
  console.log(carInfo)
  const postToDB = async () => {
    console.log("subbmittttttttttttttttttttt",inputs)
    // const response = await fetch(`https://not-your-car.herokuapp.com/create_post`, {
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json',
    //     'Authorization': `Token ${localStorage.getItem("token")}`
    //   },
    //   body: JSON.stringify(inputs)
    // })
    // const jsonData = await response.json()
    // if (jsonData.success) {
    //   toggleModal()
    // }
  };
  const {inputs = {brand: carInfo.brand_name}, errors, handleInputChange, handleSubmit} = useForm(postToDB, validate);

  const toggleModal = () => {
      setModal(!modal);
  };
  useEffect(() => {
    setCarInfo(props.listCar.find(car => car.id == props.match.params.id))
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  return (
    <div
    className="page-header pb-5"
    style={{
      backgroundImage: "url(" + require("assets/img/ilya-yakover.jpg") + ")"
    }}
  >
    <div className="filter" />
    <Container>
      <Row>
        <Col className="ml-auto mr-auto">
          <Card className="card-create ml-auto mr-auto">
            <h2 className="mx-auto mb-4 font-weight-bold">Create A Rental Car</h2>
            <Form onSubmit={handleSubmit}>
            <div className="row">
            <div className="col-sm-7 col-md-7">
              <Row>
              <Col className="form-group">
                <h6 className="text-white">
                  Brand Name <span className="icon-danger">*</span>
                </h6>
                <Input
                  name="brand"
                  defaultValue={inputs.brand}
                  onChange={handleInputChange} 
                  value={inputs.brand}
                  placeholder="enter the brand name here..."
                  type="text"
                  className="border-input form-control"
                />
              </Col>
              <Col className="form-group">
                <h6 className="text-white">
                  Model <span className="icon-danger">*</span>
                </h6>
                <Input
                  name="model"
                  onChange={handleInputChange} 
                  value={inputs.model = carInfo.model || ""}
                  placeholder="enter the model name here..."
                  type="text"
                  className="border-input form-control"
                />
              </Col>
              </Row>
              <div className="form-group">
                <h6 className="text-white">
                  Class Name <span className="icon-danger">*</span>
                </h6>
                <Input
                  name="class"
                  onChange={handleInputChange} 
                  value={inputs.class = carInfo.class_name || ""}
                  placeholder="enter the class Name here..."
                  type="text"
                  className="border-input form-control"
                />
              </div>
              <Row>
              <Col>
              <FormGroup className={`form ${errors.door && 'has-danger'}`}>
                <h6 for="exampleSelect1" className="text-white">Door <span className="icon-danger"> *</span></h6>
                <Input 
                  name="door"
                  onChange={handleInputChange} 
                  value={inputs.door = carInfo.door|| ""}
                  type="select"  
                  id="exampleSelect1"
                  >
                  <option value ="">Select</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Input>
                {errors.door && (
                  <p className="help text-danger font-weight-bold">{errors.door}</p>
                )}
              </FormGroup>
              </Col>
              <Col>
              <FormGroup className={`form ${errors.gearbox && 'has-danger'}`} >
                <h6 for="exampleSelect2" className="text-white">Gear Box <span className="icon-danger"> *</span></h6>
                <Input 
                  name="gearbox"
                  onChange={handleInputChange} 
                  value={inputs.gearbox = carInfo.gear_box || ""}
                  type="select" 
                  id="exampleSelect2">
                  <option value ="">Select</option>
                  <option>Auto</option>
                  <option>Manual</option>
                </Input>
                {errors.gearbox && (
                  <p className="help text-danger font-weight-bold">{errors.gearbox}</p>
                )}
              </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col>
              <FormGroup className={`form ${errors.fuel && 'has-danger'}`} >
                <h6 for="exampleSelect3" className="text-white">Fuel <span className="icon-danger"> *</span></h6>
                <Input 
                  name="fuel"
                  onChange={handleInputChange} 
                  value={inputs.fuel = carInfo.fuel || ""}
                  type="select"  
                  id="exampleSelect3">
                  <option value ="">Select</option>
                  <option>Gasoline</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                </Input>
                {errors.fuel && (
                  <p className="help text-danger font-weight-bold">{errors.fuel}</p>
                )}
              </FormGroup>
              </Col>
              <Col>
              <FormGroup className={`form ${errors.price && 'has-danger'}`} >
              <h6 className="text-white">
                    Price <span className="icon-danger">*</span>
                  </h6>
                  <div className="border-input input-group">
                    <Input
                      name="price"
                      onChange={handleInputChange} 
                      value={inputs.price || ""}
                      placeholder="enter price..."
                      type="number"
                      className="border-input form-control"
                      autoFocus
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-dollar" />
                      </span>
                    </div>
                  </div>
                  {errors.price && (
                  <p className="help text-danger font-weight-bold">{errors.price}</p>
                )}
                </FormGroup>
              </Col>
              </Row>
              <div className="form-group mt-1 mb-5">
                <h6 className="text-white">Description</h6>
                <textarea
                  name="description"
                  onChange={handleInputChange} 
                  value={inputs.description = carInfo.description || ""}
                  maxLength={150}
                  placeholder="enter the description ..."
                  rows={8}
                  className="textarea-limited form-control"
                  defaultValue={""}
                />
              </div>
            </div>
                  <div className="col-sm-5 col-md-5">
              <h6 className="text-white">Product Image</h6>
              <div className="fileinput text-center mb-2">
                <img
                  style={{width:"440px"}}
                  src="https://camo.githubusercontent.com/d1b266fad8e2d9abd4a033a02a68f98e5ca53509/68747470733a2f2f6d61726b6574696e676465636f6e746575646f2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f7468756d626e61696c2e706e67"
                  alt="..."
                />
                <Input
                  name="img"
                  onChange={handleInputChange} 
                  value={inputs.img = carInfo.img || ""}
                  placeholder="enter the image url here..."
                  type="text"
                  className="border-input form-control mt-3"
                />
                <div className="thumbnail">
                </div>
                {/* <div>
                  <button
                    type="button"
                    className="btn-round btn btn-outline-default"
                  >
                    Select image
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <Row>
              <Button
                color="warning"
                type="submit"
                className="btn-round btn btn-block text-dark"
              >
                Save &amp; Publish
              </Button>
              <Modal isOpen={modal}  toggle={() => toggleModal()}>
                <div className="modal-header">
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={toggleModal}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    Modal title
                  </h5>
                </div>
                <div className="modal-body">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                  Separated they live in Bookmarksgrove right at the coast of
                  the Semantics, a large language ocean. A small river named
                  Duden flows by their place and supplies it with the necessary
                  regelialia. It is a paradisematic country, in which roasted
                  parts of sentences fly into your mouth. Even the all-powerful
                  Pointing has no control about the blind texts it is an almost
                  unorthographic life One day however a small line of blind text
                  by the name of Lorem Ipsum decided to leave for the far World
                  of Grammar.
                </div>
                <div className="modal-footer">
                  <div className="left-side">
                    <Button
                      className="btn-link"
                      color="default"
                      type="button"
                      onClick={() => toggleModal()}
                    >
                      Never mind
                    </Button>
                  </div>
                  <div className="divider" />
                  <div className="right-side">
                    <Button className="btn-link" color="danger" type="button">
                      Delete
                    </Button>
                  </div>
                </div>
              </Modal>
          </Row>
        </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default EditCar;
