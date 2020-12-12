import React, { Component } from "react";
import { makeHttpPostCallout } from "../util/util";
import { postfetchApi } from "../util/Constant";
import Post from "./Post";
import ReactDOM from "react-dom";
export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.getPost = this.getPost.bind(this);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    this.getPost();
    ReactDOM.findDOMNode(this).addEventListener(
      "post-refresh",
      this.handleRefresh
    );
  }
  handleRefresh() {
    this.getPost();
  }
  getPost() {
    var body = {
      author: this.props.userID,
    };
    makeHttpPostCallout(postfetchApi, body)
      .then((posts) => {
        this.setState({
          posts,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        {this.state.posts.length > 0 ? (
          <div>
            {this.state.posts.map((post) => (
              <Post post={post} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
