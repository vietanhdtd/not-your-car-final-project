import React from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import {Button} from 'reactstrap'

const CLOUDINARY_UPLOAD_PRESET = "kpwzohvu";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/vietanh1604/image/upload";
const CLOUDINARY_DESTROY_URL =
  "https://api.cloudinary.com/v1_1/vietanh1604/delete_by_token";

export default class ImgUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: props.img_url,
      isLoading: false
    };
    this.handleDestroyImage = this.handleDestroyImage.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this)
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

 handleDestroyImage(event=null, delete_token=this.state.delete_token) {
   if(event) {
    event.preventDefault();
   }
    fetch(CLOUDINARY_DESTROY_URL, {
      method: "POST",
      body: new URLSearchParams(`token=${delete_token}`)
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          this.setState({ uploadedFileCloudinaryUrl: "", delete_token: "" }, () => this.props.handleImageUrl(this.state.uploadedFileCloudinaryUrl) );
          console.log(data);
        }
      })
      .catch(err => console.log(err));
  }

 async handleImageUpload(file) {
   await this.setState({ isLoading: true})

    if (this.state.delete_token) {
   this.handleDestroyImage();
    }

    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      console.log(response);
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
          delete_token: response.body.delete_token,
          isLoading: false
        }, () => this.props.handleImageUrl(this.state.uploadedFileCloudinaryUrl));
      }
    });
  }

  render() {
    return (
      
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            accept="image/*"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()}/>
                  {this.state.uploadedFileCloudinaryUrl ? (
                    <div className="owner1">
                      <div class="avatar">
                      <img
                        className="img-circle img-no-padding img-responsive" alt="team"
                        src={this.state.uploadedFileCloudinaryUrl}
                      />
                    </div>
                    </div>
                  ) : <span/>}
                  { this.state.isLoading ? <Button className="btn-round btn-icon" color="warning">Uploading...</Button> :
                  this.state.delete_token ? 
                    <><Button className="btn-round btn-icon" color="warning">
                      <strong>Upload photo</strong>
                    </Button>
                    <Button className="btn-round btn-icon" color="warning" onClick={(event) => this.handleDestroyImage(event, this.state.delete_token)}> Remove</Button></> : 
                    <Button className="btn-round btn-icon" color="warning">
                    <strong>Upload photo</strong>
                  </Button> }
                </div>
              );
            }}
          </Dropzone>
        </div>
    );
  }
}