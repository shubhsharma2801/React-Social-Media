import React, { Component } from "react";
import "./Profile.css";
import { Grid, Header, Image, Button } from "semantic-ui-react";
import {
  resizeFile,
  profilePicUploadApi,
  makeHttpPostCalloutForFormData,
  makeHttpPostCallout,
  profileFetchApi,
  getFromLocalStorage,
} from "../util/util";
import { Tab } from "semantic-ui-react";

const getPostGrouping = (posts) => {
  var groupArr = [];
  for (let i = 0; i < posts.length; i += 3) {
    groupArr.push(posts.slice(i, i + 3));
  }
  return groupArr;
};
/*var */

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.profileUpload = this.profileUpload.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.state = {
      profile: null,
      fallbackPicture:
        "https://react.semantic-ui.com/images/wireframe/square-image.png",
    };
    this.panes = [
      {
        menuItem: { key: "post", icon: "grid layout", content: "POSTS" },
        render: () => (
          <Tab.Pane attached={false}>
            <Grid columns={3}>{this.getPostImage()}</Grid>
          </Tab.Pane>
        ),
      },
      {
        menuItem: { key: "save", icon: "bookmark", content: "SAVED" },
        render: () => <Tab.Pane attached={false}>To be Implemented</Tab.Pane>,
      },
      {
        menuItem: { key: "tag", icon: "tag", content: "TAGGED" },
        render: () => <Tab.Pane attached={false}>To be Implemented</Tab.Pane>,
      },
    ];
    this.getPostImage = this.getPostImage.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }
  getPostImage = () => {
    if (this.state.profile && this.state.profile.posts) {
      var postGroup = getPostGrouping(this.state.profile.posts);
      return postGroup.map((group) => {
        return (
          <Grid.Row>
            {group.map((post) => (
              <Grid.Column>
                <Image src={`data:image/png;base64,${post.imageData}`} />
              </Grid.Column>
            ))}
          </Grid.Row>
        );
      });
    } else {
      return "";
    }
  };
  getProfile() {
    var body = {
      author: getFromLocalStorage("userId"),
    };
    makeHttpPostCallout(profileFetchApi, body).then((profile) => {
      this.setState({
        profile,
      });
    });
  }
  async handleFileChange(e) {
    var file = e.target.files[0];
    var image = await resizeFile(file);
    const formData = new FormData();
    formData.append("profileImage", image);
    formData.append("userId", getFromLocalStorage("userId"));
    makeHttpPostCalloutForFormData(profilePicUploadApi, formData)
      .then((res) => this.getProfile())
      .catch((err) => console.log(err));
    console.log(image);
  }
  profileUpload() {
    this.inputElement.click();
  }
  render() {
    return (
      <div className="profile">
        <Grid>
          <Grid.Row centered>
            <Grid.Column size={4} textAlign="center">
              <div onClick={this.profileUpload}>
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={this.handleFileChange}
                  ref={(input) => (this.inputElement = input)}
                />
                {this.state.profile && this.state.profile.user ? (
                  <Image
                    src={`data:image/png;base64,${this.state.profile.user.imageData}`}
                    avatar
                    circular
                    size="small"
                  />
                ) : (
                  <Image src={this.state.profile} avatar size="small" />
                )}
              </div>
            </Grid.Column>
            <Grid.Column size={12}>
              <div className="profile_content">
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <h2>
                        {this.state.profile && this.state.profile.user
                          ? this.state.profile.user.username
                          : ""}
                      </h2>
                    </Grid.Column>
                    <Grid.Column>
                      <Button>Edit Profile</Button>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <span>
                        <b>25</b> Posts
                      </span>
                      &nbsp; &nbsp; &nbsp;
                      <span>
                        <b>165</b> Followers
                      </span>
                      &nbsp; &nbsp; &nbsp;
                      <span>
                        <b>165</b> Following
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column size={4}>
              <Tab
                menu={{ secondary: true, pointing: true }}
                panes={this.panes}
                grid={{ paneWidth: 12, tabWidth: 4 }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
