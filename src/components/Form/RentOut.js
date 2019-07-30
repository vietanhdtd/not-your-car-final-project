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
import ImgUpload from '../ImageUpload'


function RentOut(props) {
  // const [data, setData] = useState({})
  // const [result, setResult] = useState(false);
  const [modal, setModal] = useState(false);
  const postToDB = async () => {
    console.log(inputs)
    const response = await fetch(`https://not-your-car.herokuapp.com/create_post`, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(inputs)
    })
    const jsonData = await response.json()
    if (jsonData.success) {
      setModal(true)
    }
  };
  const {inputs, errors, handleInputChange, handleSubmit} = useForm(postToDB, validate);

  const toggleModal = () => {
      props.setIsCreated(true)
      props.getCars()
      setModal(false);
  };

  const handleImageUrl = (img_url) => {
      console.log(img_url)
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add("register-page");
    // document.body.style.overflow = "hidden";
    return function cleanup() {
      document.body.classList.remove("register-page");
    // document.body.style.overflow = "auto";
    };
  });

  return (
    <div
    className="page-header"
    style={{
      backgroundImage: "url(" + require("assets/img/rent-out.jpg") + ")"
    }}
  >
    <div className="filter" />
    <Container>
      <Row>
        <Col className="ml-auto mr-auto">
          <Card className="card-create ml-auto mr-auto">
            <h2 className="mx-auto mb-4 font-weight-bold">Rent Out Your Car</h2>
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
                  onChange={handleInputChange} 
                  value={inputs.brand || ""}
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
                  value={inputs.model || ""}
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
                  value={inputs.class || ""}
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
                  value={inputs.door || ""}
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
                  value={inputs.gearbox || ""}
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
                  value={inputs.fuel || ""}
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
              <div className={`form-group mt-1 mb-5  ${errors.description && 'has-danger'}`}>
                <h6 className="text-white">Description<span className="icon-danger">*</span></h6>
                <textarea
                  name="description"
                  onChange={handleInputChange} 
                  value={inputs.description || ""}
                  maxLength={150}
                  placeholder="enter the description ..."
                  rows={8}
                  className="textarea-limited form-control"
                  defaultValue={""}
                />
                {errors.description && (
                  <p className="help text-danger font-weight-bold">{errors.description}</p>
                )}
              </div>
            </div>
                  <div className="col-sm-5 col-md-5">
              <h6 className="text-white">Product Image<span className="icon-danger">*</span></h6>
              <div className="fileinput text-center mb-2">
                {/* <Form>
              <ImgUpload
                      handleImageUrl={(img_url) => handleImageUrl(img_url)}
                    />
                </Form> */}
                <img
                  style={{width:"440px"}}
                  src="https://camo.githubusercontent.com/d1b266fad8e2d9abd4a033a02a68f98e5ca53509/68747470733a2f2f6d61726b6574696e676465636f6e746575646f2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30362f7468756d626e61696c2e706e67"
                  alt="..."
                />
                <Input
                  name="img"
                  onChange={handleInputChange} 
                  value={inputs.img || ""}
                  placeholder="enter the image url here..."
                  type="text"
                  className="border-input form-control mt-3"
                />
                <div className="thumbnail">
                </div>
                <div>
                  <button
                    type="button"
                    className="btn-round btn btn-outline-default"
                  >
                    Select image
                  </button>
                </div>
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
                    Congratulation
                  </h5>
                </div>
                <div className="modal-body">
                  Your car has been posted to <strong>not your car</strong>. Now every one can rents your car. 
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

export default RentOut;


//  <Container className="mt-5" style={{zIndex:1}}>
//         <h2 className="text-white">Create A Rental Car </h2>

//       </Container>