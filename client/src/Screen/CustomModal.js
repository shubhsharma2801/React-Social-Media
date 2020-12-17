import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import UserList from "./UserList";
export default function CustomModal(props) {
  return (
    <div>
      <Modal open={true} >
        <UserList users={props.users}  />
      </Modal>
    </div>
  );
}
