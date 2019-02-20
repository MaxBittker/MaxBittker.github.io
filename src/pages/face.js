import React from "react";
import RcScout from "../components/rcscout.js";

import "./example.less";
import face from "./face/face.jpg";
import dog from "./face/dog.jpg";

export default class Face extends React.Component {
  render() {
    return (
      <div>
        <h1>My face :- )</h1>
        <img alt="my face" src={face} />
        <h1>My dog</h1>

        <img alt="my dog" src={dog} />
      </div>
    );
  }
}
