import React, { useEffect } from "react";
import "./Post.css";
import { Card, Icon, Image } from "semantic-ui-react";
import PostComments from "./PostComments";
import { ReactComponent as Like } from "../like.svg";
import { ReactComponent as Comment } from "../comment.svg";
import { ReactComponent as Message } from "../directMessage.svg";
const postStyle = {
  marginLeft: "33%",
  width: "30%",
  marginTop: "2%",
  marginBottom: "4%",
  borderRadius: "0%",
};
export default function Post(props) {
  useEffect(() => {
    // Update the document title using the browser API
    console.log("In Post **********");
  });
  return (
    <Card style={postStyle}>
      <Card.Content>
        <Image
          src="https://react.semantic-ui.com/images/wireframe/square-image.png"
          avatar
        />
        <span>{props.post.author.username}</span>
      </Card.Content>
      <Image
        src={`data:image/png;base64,${props.post.imageData}`}
        wrapped
        ui={false}
        size="huge"
        className="postImage"
      />
      <Card.Content>
        <section style={{ cursor: "pointer" }}>
          <Like />
          &nbsp; &nbsp; &nbsp;
          <Comment />
          &nbsp; &nbsp; &nbsp;
          <Message />
        </section>
        <br></br>
        <Card.Header as="a">{props.post.author.username}</Card.Header>
        <Card.Description>{props.post.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <PostComments />
      </Card.Content>
    </Card>
  );
}
