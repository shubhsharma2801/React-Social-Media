import React, { Component } from "react";
import HomePageHeader from "./HomePageHeader";
import Profile from "./Profile";
import Posts from "./Posts";
import Message from "./Message";
import { showMessage } from "../util/util";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.showMessage = this.showMessage.bind(this);
    this.post = React.createRef();
    this.profile = React.createRef();
    this.refreshPost = this.refreshPost.bind(this);
    this.state = {
      userId: "",
    };
  }
  componentDidMount() {
    this.setState({ userId: this.props.match.params.userid });
    console.log(this.props.match);
  }
  refreshPost() {
    if (this.post.current) {
      this.post.current.getPost();
    }
    if (this.profile.current){
      this.profile.current.getProfile();
    }
  }
  showMessage(context) {
    showMessage(context);
  }

  render() {
    return (
      <div>
        <HomePageHeader
          userID={this.state.userId}
          errorMessage={this.showMessage}
          refreshPost={this.refreshPost}
        />

        <Switch>
          <Route path="/homepage/message" render={() => <Message />} />
          <Route
            path="/homepage/profile"
            render={() => <Profile ref={this.profile} userID={this.state.userId} />}
          />
          <Route
            path="/homepage/:userid"
            exact={true}
            render={() => (
              <Posts ref={this.post} userID={this.props.match.params.userid} />
            )}
          ></Route>
        </Switch>

        <div id="homepage_message"></div>

        {/*
        {/* <Profile/> */}
        {/*<Posts ref={this.post} userID={this.props.match.params.userid} />*/}
      </div>
    );
  }
}
