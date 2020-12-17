import React, { useState } from "react";
import { Input, List, Image, Divider, Popup } from "semantic-ui-react";
export default function UserList(props) {
  
  function renderUserDropDown(users) {
    return users.map((user) => {
      return (
        <List selection key={user._id}>
          <List.Item
            data-id={user._id}
            onClick={() => props.callback(user._id)}
          >
            {user.imageData ? (
              <Image avatar src={`data:image/png;base64,${user.imageData}`} />
            ) : (
              <Image
                src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                avatar
              />
            )}

            <List.Content>
              <List.Header as="a">{user.username}</List.Header>
              <List.Description>{user.fullname}</List.Description>
            </List.Content>
          </List.Item>
        </List>
      );
    });
  }
  return <div>{renderUserDropDown(props.users)}</div>;
}
