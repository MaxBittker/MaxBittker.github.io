import React from "react";
import RcScout from "../components/rcscout.js";
import HRadio from "../components/hradio.js";
import Link from "gatsby-link";
import "./example.less";
let linkStyle = {};
export default class About extends React.Component {
  render() {
    return (
      <div>
        <marquee>
          <h1>Welcome to my web page &lt;/marquee&gt;</h1>
        </marquee>
        <HRadio n={150} />

        <p>
          I'm a developer & artist interested in democratized, distributed, and
          de-militarized computing.
        </p>
        <p>
          That sounds cool but it's mostly aspirational. I do make art and weird
          computer programs sometimes though. You can find those here on this
          website
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginBottom: "1em"
          }}
        >
          <Link to={"/projects/"} style={linkStyle}>
            projects
          </Link>
          <Link to={"/games/"} style={linkStyle}>
            games
          </Link>
          <Link to={"/art/"} style={linkStyle}>
            art
          </Link>
          <Link to={"/blog/"} style={linkStyle}>
            blog
          </Link>
        </div>

        <p>and on my social media:</p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginBottom: "1em"
          }}
        >
          <a href="https://twitter.com/MaxBittker">
            {" "}
            twitter <small>(twitter)</small>
          </a>
          <a href="https://github.com/MaxBittker">
            {" "}
            github <small>(microsoft)</small>{" "}
          </a>
          <a href="https://www.instagram.com/maxbittker/">
            {" "}
            instagram <small>(facebook)</small>
          </a>
          <a href="https://goodreads.com/maxbittker">
            {" "}
            goodreads <small>(amazon)</small>
          </a>
        </div>
        <p>I also care a lot about learning, community, and communication.</p>
        <p>
          I used to work at Sentry, writing open source tools to help people
          find and fix errors. Lately, I'm employed by Google, doing stuff on
          the Fuchsia operating system.
        </p>
        <p>
          Other interests I have are programming languages, weird videogames,
          riding a bike, cooking, electronics, fiction, folk punk,
          intersectional feminism, anarchism, math, operating systems,
          vegetables, graphics, watercolors
        </p>
        <HRadio n={150} flip />
        <RcScout />
      </div>
    );
  }
}
