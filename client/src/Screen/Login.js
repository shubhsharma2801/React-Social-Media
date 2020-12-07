//TODO : UI can be made better
//TODO : Validations
import React, { Component } from "react";
import { Grid, Image, Form, Button, Header, Divider } from "semantic-ui-react";
import "./Login.css";
import {
  makeHttpPostCallout,
  loginapi,
  showMessage,
  saveSessionInLocalStorage,
} from "../util/util";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit() {
    var body = {
      user: {
        email: this.state.username,
        password: this.state.password,
      },
    };
    console.log(JSON.stringify(body));
    makeHttpPostCallout(loginapi, body)
      .then((data) => {
        console.log(data);
        if (data.user === "Invalid Credentials") {
          let context = {};
          context.id = "login_message";
          context.props = { negative: true };
          context.message = "Invalid Credentials";
          showMessage(context);
        } else {
          const { token, _id } = data.user;
          saveSessionInLocalStorage(token);
          this.props.history.push(`/homepage/${_id}`);
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <Grid
          columns={2}
          style={containerStyle}
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Row>
            <Grid.Column width={16}>
              <div id="login_message"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column only="computer">
              <Image src="/front-page.jpg" size="big" rounded />
            </Grid.Column>
            <Grid.Column>
              <div>
                <Header as="h1" style={headerStyle}>
                  ReactGram
                </Header>
                <Form>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input
                          name="username"
                          value={this.state.username}
                          placeholder="Phone Number, User Name or Email"
                          onChange={this.handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input
                          name="password"
                          value={this.state.password}
                          placeholder="PassWord"
                          type="password"
                          onChange={this.handleChange}
                          autoComplete="off"
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Button
                          type="Submit"
                          width={11}
                          fluid
                          color="blue"
                          onClick={this.onSubmit}
                        >
                          Submit
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal>Or</Divider>
                    <Grid.Row>
                      <Grid.Column>
                        Dont Have an account? <a href="/register">Sign Up</a>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
let containerStyle = {
  margin: "5% 25% 10% 25%",
};
let headerStyle = {
  fontFamily: "Lobster",
  fontSize: "50px",
};
