import React from "react";
import { Container } from "react-responsive-grid";
import { Link } from "react-router";
import { prefixLink } from "gatsby-helpers";
import Headroom from "react-headroom";
import "../css/markdown-styles";
import Favicon from "../components/favicon.js";

import { rhythm } from "../utils/typography";

module.exports = React.createClass({
  propTypes() {
    return {
      children: React.PropTypes.any
    };
  },
  render() {
    let headerStyle = {
      transition: "background-color 0.3s ease"
    };
    Favicon();

    if (this.props.location.pathname !== "/") {
      headerStyle = {
        transition: "background-color 0.3s ease",
        background: `hsl(${Math.random() * 255},45%,80%)`
      };
    }
    return (
      <div>
        <Headroom
          wrapperStyle={{
            marginBottom: rhythm(0.5)
          }}
          style={headerStyle}
        >
          <Container
            style={{
              maxWidth: 960,
              paddingTop: 0,
              padding: `${rhythm(1)} ${rhythm(3 / 4)}`
            }}
          >
            <Link
              to={prefixLink("/")}
              style={{
                color: "black",
                textDecoration: "none"
              }}
            >
              max bittker ∙&nbsp;
            </Link>
            <Link
              to={prefixLink("/about/")}
              style={{
                color: "black",
                textDecoration: "none"
              }}
            >
              about ∙&nbsp;
            </Link>

            <Link
              to={prefixLink("/games/")}
              style={{
                color: "black",
                textDecoration: "none"
              }}
            >
              games ∙&nbsp;
            </Link>
            <Link
              to={prefixLink("/art/")}
              style={{
                color: "black",
                textDecoration: "none"
              }}
            >
              art ∙&nbsp;
            </Link>
            <Link
              to={prefixLink("/blog/")}
              style={{
                color: "black",
                textDecoration: "none"
              }}
            >
              blog
            </Link>
          </Container>
        </Headroom>
        <Container
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
            paddingTop: 0
          }}
        >
          {this.props.children}
        </Container>
      </div>
    );
  }
});
