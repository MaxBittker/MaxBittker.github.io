import React, {PropTypes} from "react";

export default class RCScout extends React.Component {
  rerenderScout() {
    if (window._rcs && window._rcs.inst) {
      window._rcs.inst.render();
    }
  }

  componentDidMount() {
    this.rerenderScout();
  }

  componentDidUpdate() {
    this.rerenderScout();
  }

  render() {
    return <div className="rc-scout rc-scout-react" />;
  }
}
