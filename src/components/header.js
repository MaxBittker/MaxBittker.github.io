import Link from "gatsby-link";

import React from "react";
import { Container } from "react-responsive-grid";
import Favicon from "../components/favicon.js";
import Wrap from "../components/wrap";

let linkStyle = {
  color: "black",
  textDecoration: "none",
  padding: "0px  3px"
};
module.exports = React.createClass({
  propTypes() {
    return {
      children: React.PropTypes.any,
      siteTitle: React.PropTypes.string
    };
  },

  render() {
    let headerStyle = {
      transition: "background-color 0.3s ease"
    };
    Favicon();
    if (typeof window != "undefined") {
      if (window.location.pathname !== "/") {
      }
    }
    return (
      <div>
          <Wrap n={3}>
            <Link to={"/"} style={linkStyle}>
              max bittker
            </Link>
          </Wrap>
          <Wrap n={3}>
            <Link to={"/about/"} style={linkStyle}>
              about
            </Link>
          </Wrap>
          <Wrap n={3}>
            <Link to={"/games/"} style={linkStyle}>
              games
            </Link>
          </Wrap>
          <Wrap n={3}>
            <Link to={"/art/"} style={linkStyle}>
              art
            </Link>
          </Wrap>
          <Wrap n={3}>
            <Link to={"/blog/"} style={linkStyle}>
              blog
            </Link>
          </Wrap>
      </div>
    );
  }
});
