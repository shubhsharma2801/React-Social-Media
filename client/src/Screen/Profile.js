import React, { Component } from "react";
import "./Profile.css";
import { Grid, Header, Image, Button } from "semantic-ui-react";
import {
  resizeFile,
  profilePicUploadApi,
  makeHttpPostCalloutForFormData,
} from "../util/util";

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.profileUpload = this.profileUpload.bind(this);
    this.refreshProfile = this.refreshProfile.bind(this);
    this.state = {
      profile:
        "https://react.semantic-ui.com/images/wireframe/square-image.png",
      profilePicture: null,
    };
  }
  refreshProfile(){
    
  }
  async handleFileChange(e) {
    var file = e.target.files[0];
    var image = await resizeFile(file);
    const formData = new FormData();
    formData.append("profileImage", image);
    formData.append("userId", this.props.userID);
    makeHttpPostCalloutForFormData(profilePicUploadApi, formData)
      .then((res) => console.log(res))
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
          <Grid.Row>
            <Grid.Column size={4}>
              <div onClick={this.profileUpload}>
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={this.handleFileChange}
                  ref={(input) => (this.inputElement = input)}
                />
                <Image src={this.state.profile} avatar size="small" />
              </div>
            </Grid.Column>
            <Grid.Column size={12}>
              <div className="profile_content">
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <h2>shubhsharma_2895</h2>
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
        </Grid>
      </div>
    );
  }
}
