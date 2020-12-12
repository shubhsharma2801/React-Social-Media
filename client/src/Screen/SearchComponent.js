import React, { useState } from "react";
import { Input, List, Image, Divider, Popup } from "semantic-ui-react";
import PopupCustom from "./PopupCustom";
import { makeHttpPostCallout } from "../util/util";
import { searchUserApi } from "../util/Constant";
import { useHistory } from "react-router-dom";
export default function SearchComponent(props) {
  let history = useHistory();
  const [user, setuser] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const [open, setOpen] = useState(false);
  var getInput = () => (
    <Input
      size="mini"
      style={{ fontSize: "12px" }}
      icon="search"
      value={searchKey}
      placeholder="Search..."
      onChange={handleChange}
    />
  );
  function handleChange(e) {
    setsearchKey(e.target.value);
    if (e.target.value) {
      setOpen(true);
      var body = {
        searchKey,
      };
      makeHttpPostCallout(searchUserApi, body)
        .then((user) => setuser(user))
        .catch((err) => console.log(err));
    } else {
      setuser([]);
      setOpen(false);
    }
  }
  function redirectToUser(id) {
    setOpen(false);
    setsearchKey("");
    history.push(`/homepage/profile?userId=${id}`);
  }

  function renderUserDropDown(users) {
    return users.map((user) => {
      return (
        <List selection key={user._id}>
          <List.Item
            data-id={user._id}
            onClick={() => redirectToUser(user._id)}
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

  return (
    <div>
      <Popup
        style={{ width: "500px", paddingLeft: "0", paddingRight: "0" }}
        open={open}
        trigger={getInput()}
        pinned
        on="click"
        position="bottom center"
      >
        {renderUserDropDown(user)}
      </Popup>
    </div>
  );
}
