import React, { Component } from "react";
import {
  Modal,
  Button,
  Image,
  Header,
  Input,
  Icon,
  Ref,
  Sticky,
  Card,
} from "semantic-ui-react";
import "./HomePageHeader.css";
import { ReactComponent as Like } from "../like.svg";
import { ReactComponent as Home } from "../home.svg";
import { ReactComponent as Message } from "../directMessage.svg";
import {
  makeHttpPostCallout,
  makeHttpPostCalloutForFormData,
  getFromLocalStorage,
} from "../util/util";
import { postUploadApi } from "../util/Constant";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";
export default class HomePageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false,
      file: null,
      imgSrc: null,
      imageDescription: "",
    };
    this.fileUploaderClicked = this.fileUploaderClicked.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  fileUploaderClicked() {
    this.inputElement.click();
  }
  handleFileChange(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = (evt) => {
      this.setState({
        file: file,
        imgSrc: [reader.result],
        open: true,
      });
    };
  }
  setOpen(val) {
    this.setState({
      open: val,
    });
  }
  uploadImage() {
    const formData = new FormData();
    formData.append("postImage", this.state.file);
    formData.append("postDescription", this.state.imageDescription);
    formData.append("userID", getFromLocalStorage("userId"));
    makeHttpPostCalloutForFormData(postUploadApi, formData)
      .then((res) => {
        this.props.refreshPost();
        this.setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        let context = {};
        context.id = "homepage_message";
        context.props = { negative: true };
        context.message = "Something went wrong. Please check logs";
        this.props.errorMessage(context);
        this.setOpen(false);
      });
  }
  render() {
    return (
      <Ref innerRef={this.contextRef}>
        <Sticky context={this.contextRef}>
          <Modal
            basic
            onClose={() => this.setOpen(false)}
            onOpen={() => this.setOpen(true)}
            open={this.state.open}
          >
            <Modal.Content image>
              <Card
                fluid
                className="register-card"
                style={{ borderRadius: "none" }}
              >
                <Image
                  wrapped
                  src={this.state.imgSrc}
                  size="medium"
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Post Description</Card.Header>
                  <Card.Description>
                    <Input
                      name="imageDescription"
                      className="post_description"
                      size="large"
                      type="text"
                      value={this.state.imageDescription}
                      placeholder="Enter Post description"
                      onChange={this.handleChange.bind(this)}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => this.setOpen(false)}>Cancel</Button>
              <Button onClick={this.uploadImage} positive>
                Upload Image
              </Button>
            </Modal.Actions>
          </Modal>
          <nav className="navbar">
            <ul>
              <li>
                <Header as="h1" style={headerStyle}>
                  ReactGram
                </Header>
              </li>
              <li>
                <SearchComponent />
              </li>
              <li>
                <div className="icon-group">
                  <Link to={`/homepage/${getFromLocalStorage("userId")}`}>
                    <Home style={{ cursor: "pointer" }} />
                  </Link>
                  &nbsp; &nbsp;
                  <Link to="/homepage/message">
                    <Message />
                  </Link>
                  &nbsp; &nbsp;
                  <Like />
                  &nbsp; &nbsp;
                  <div onClick={this.fileUploaderClicked}>
                    <input
                      type="file"
                      id="upload-button"
                      style={{ display: "none" }}
                      onChange={this.handleFileChange}
                      ref={(input) => (this.inputElement = input)}
                    />
                    <Icon name="camera" size="small"></Icon>
                  </div>
                  &nbsp; &nbsp;
                  <Link to="/homepage/profile">
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      avatar
                      size="tiny"
                    />
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
        </Sticky>
      </Ref>
    );
  }
}
let headerStyle = {
  fontFamily: "Lobster",
  fontSize: "25px",
  fontWeight: "lighter",
};
