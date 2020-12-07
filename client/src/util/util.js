import React from "react";
import ReactDOM from "react-dom";
import ls from "local-storage";
import { Message } from "semantic-ui-react";
import Resizer from "react-image-file-resizer";
export const ENDPOINT = "http://localhost:5000";
export const loginapi = "/api/users/login";
export const postUploadApi = "/api/post/upload";
export const postfetchApi = "/api/post/fetchPost";
export const profilePicUploadApi = "/api/profile/uploadProfilePic";
export const ClientID =
  "15089775636-b32piqktdtehsat7bpeish4bl4vjanvc.apps.googleusercontent.com";
export const Client_Secret = "E3ojZ955lH1KFQT8zChwj86i";

const getMessageComponent = (props, message) => (
  <Message {...props}>{message}</Message>
);
export const makeHttpPostCallout = (url, body) => {
  return new Promise((resolve, reject) => {
    fetch(ENDPOINT + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${fetchSessionInLocalStorage()}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

//http post for formdata type request
export const makeHttpPostCalloutForFormData = (url, body) => {
  return new Promise((resolve, reject) => {
    fetch(ENDPOINT + url, {
      method: "POST",
      headers: { Authorization: `Token ${fetchSessionInLocalStorage()}` },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const handleDismiss = (id) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(id));
};

export const showMessage = (context) => {
  context.props.onDismiss = handleDismiss.bind(null, context.id);
  const messageComponent = getMessageComponent(context.props, context.message);
  ReactDOM.render(messageComponent, document.getElementById(context.id));
};

export const saveSessionInLocalStorage = (token) => {
  ls.set("token", token);
};

export const resizeFile = (file) =>
  new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });
export const APP_NAME = "ReactGram";
export const fetchSessionInLocalStorage = () => ls.get("token");
