import React from "react";
import { Input, List, Image, Divider, Popup } from "semantic-ui-react";

var getInput = () => (
  <Input
    size="mini"
    style={{ fontSize: "12px" }}
    icon="search"
    placeholder="Search..."
  />
);
export default function SearchComponent() {
  return (
    <div>
      <Popup trigger={getInput()} pinned on="click" position="bottom center">
        <List>
          <List.Item>
            <Image
              avatar
              src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
            />
            <List.Content>
              <List.Header as="a">Rachel</List.Header>
              <List.Description>
                Last seen watching{" "}
              </List.Description>
            </List.Content>
          </List.Item>
          <Divider />
          <List.Item>
            <Image
              avatar
              src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
            />
            <List.Content>
              <List.Header as="a">Lindsay</List.Header>
              <List.Description>
                Last seen watching{" "}
              </List.Description>
            </List.Content>
          </List.Item>
          <Divider />
          <List.Item>
            <Image
              avatar
              src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
            />
            <List.Content>
              <List.Header as="a">Matthew</List.Header>
              <List.Description>
                Last seen watching{" "}
              </List.Description>
            </List.Content>
          </List.Item>
          <Divider />
          <List.Item>
            <Image
              avatar
              src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
            />
            <List.Content>
              <List.Header as="a">Jenny Hess</List.Header>
              <List.Description>
                Last seen watching{" "}
              </List.Description>
            </List.Content>
          </List.Item>
          <Divider />
          <List.Item>
            <Image
              avatar
              src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg"
            />
            <List.Content>
              <List.Header as="a">Veronika Ossi</List.Header>
              <List.Description>
                Has not watched anything recently
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Popup>
    </div>
  );
}
