import React, { useState } from "react";
import { Input, List, Image, Divider, Popup } from "semantic-ui-react";
import UserList from "./UserList";
import { makeHttpPostCallout } from "../util/util";
import { searchUserApi } from "../util/Constant";
import { useHistory } from "react-router-dom";
export default function SearchComponent(props) {
  let history = useHistory();
  const [user, setuser] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const [open, setOpen] = useState(false);
  function redirectToUser(id) {
    setOpen(false);
    setsearchKey("");
    history.push(`/homepage/profile?userId=${id}`);
  }
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
        <UserList users={user} callback={redirectToUser} />
      </Popup>
    </div>
  );
}
