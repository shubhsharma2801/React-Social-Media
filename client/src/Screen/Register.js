//TODO : Make user directly go to profile page to customize
//TODO : Some validations like
//TODO : User with same email to not be created
//TODO : Validations
import React, { Component } from "react";
import "./Register.css";
import { Grid, Form, Button, Header, Divider, Card } from "semantic-ui-react";
import { makeHttpPostCallout, showMessage } from "../util/util";
const registerApi = "/api/users/";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        fullname: "",
        username: "",
        password: "",
      },
    };
  }
  handleChange(e) {
    const cloneUser = Object.assign({}, this.state.user);
    cloneUser[e.target.name] = e.target.value;
    this.setState({ user: cloneUser });
  }
  registerUser() {
    console.log(this.state);
    let context = {};
    context.id = "register_message";
    const cloneUser = Object.assign({}, this.state.user);
    makeHttpPostCallout(registerApi, { user: cloneUser })
      .then(() => {
        context.props = { positive: true };
        context.message =
          "User Registered Successfully. Please Log In to continue";
        showMessage(context);
      })
      .catch(() => {
        context.props = { negetive: true };
        context.message = "Something went wrong !!";
        showMessage(context);
      });
  }
  render() {
    return (
      <Grid
        columns={1}
        style={containerStyle}
        textAlign="center"
        verticalAlign="middle"
      >
        <Grid.Row>
          <Grid.Column width={16}>
            <div id="register_message"></div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Card
              fluid
              className="register-card"
              style={{ borderRadius: "none" }}
            >
              <Card.Content>
                <Form>
                  <input type="hidden" value="something" />
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Header as="h1" style={headerStyle}>
                          ReactGram
                        </Header>
                        <Header as="h2" style={textStyle}>
                          Sign up to see photos and videos from your friends.
                        </Header>
                        <Form.Input
                          name="email"
                          placeholder="Phone Number or Email"
                          value={this.state.user.email}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input
                          name="fullname"
                          placeholder="Full Name"
                          autoComplete="off"
                          value={this.state.user.fullname}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input
                          name="username"
                          placeholder="Username"
                          autoComplete="off"
                          value={this.state.user.username}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input
                          name="password"
                          placeholder="Password"
                          autoComplete="off"
                          value={this.state.user.password}
                          onChange={this.handleChange.bind(this)}
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
                          onClick={this.registerUser.bind(this)}
                        >
                          Sign Up
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal>Or</Divider>
                    <Grid.Row>
                      <Grid.Column>
                        Have an account? <a href="/">Log In</a>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
let containerStyle = {
  margin: "5% 38% 10% 38%",
  backgroundColor: "#ffffff",
};
let headerStyle = {
  fontFamily: "Lobster",
  fontSize: "50px",
  fontWeight: "lighter",
};
let textStyle = {
  color: "#8e8e8e",
  color: "rgba(var(--f52,142,142,142),1)",
  fontSize: "17px",
  fontWeight: "600",
  lineHeight: "20px",
  margin: "0 40px 30px",
  textAlign: "center",
};
