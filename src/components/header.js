import Link from "gatsby-link";

import React from "react";
import createReactClass from "create-react-class";
import Favicon from "../components/favicon.js";
import Wrap from "../components/wrap";

let linkStyle = {
  color: "black",
  textDecoration: "none",
  padding: "0px  3px",
  position: "relative",
  zIndex: 100,
  // backgroundColor: "#f4eeef"
  textShadow: `
  -1px -1px  #f4eeef,
   1px -1px  #f4eeef,
   -1px 1px  #f4eeef,
  1px 1px  #f4eeef,
  -2px -2px  #f4eeef,
   2px -2px  #f4eeef,
   -2px 2px  #f4eeef,
  2px 2px  #f4eeef`
};

export default createReactClass({
  propTypes() {
    return {
      children: React.PropTypes.any,
      siteTitle: React.PropTypes.string
    };
  },

  render() {
    // let headerStyle = {
    //   transition: "background-color 0.3s ease"
    // };
    Favicon();
    if (typeof window != "undefined") {
      if (window.location.pathname !== "/") {
      }
    }
    return (
      <div>
        <Wrap n={3} pack>
          <Link to={"/"} style={linkStyle}>
            max bittker
          </Link>
        </Wrap>
        <Wrap n={3} pack>
          <Link to={"/about/"} style={linkStyle}>
            about
          </Link>
        </Wrap>
        <Wrap n={3} pack>
          <Link to={"/projects/"} style={linkStyle}>
            projects
          </Link>
        </Wrap>
        <Wrap n={3} pack>
          <Link to={"/face/"} style={linkStyle}>
            :-)
          </Link>
        </Wrap>
        <Wrap n={3} pack>
          <Link to={"/art/"} style={linkStyle}>
            art
          </Link>
        </Wrap>
        <Wrap n={3} pack>
          <Link to={"/blog/"} style={linkStyle}>
            blog
          </Link>
        </Wrap>
      </div>
    );
  }
});
