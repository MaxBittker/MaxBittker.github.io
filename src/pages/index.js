import React from "react";
import Raven from "raven-js";
import createReactClass from "create-react-class";
import Link from "gatsby-link";
import Favicon from "../components/favicon.js";

// import WebGL from "../components/webgl.js";

import "./example.less";
// import Loom from "../components/loom.js";
import HRadio from "../components/hradio.js";

import Wrap from "../components/wrap";
import face from "./face/face.jpg";
import torus from "./face/Point_cloud_torus.gif";
import dog from "./face/dog.jpg";
import plug from "./face/plug.mp4";
Raven.config("https://00f21757ccfe49a49742d4f9d7f1ab30@sentry.io/1234724", {
  release: "2.0.0",
  enviroment: "production"
}).install();
const ribbon =
  "•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•";
const HomeBrick = createReactClass({
  render() {
    let { children } = this.props;

    return (
      <div className="home-brick">
        <button
          className="x"
          onClick={e => {
            let parentElement = e.target.parentElement;
            parentElement.style = "transform: scaleX(1.01) scaleY(0.99);";
            // parentElement.style = "filter: brightness(0.8);";
            window.setTimeout(() => {
              parentElement.style = "display:none;";
            }, 150);
          }}
        >
          <svg height="10" width="10" id="d" viewBox="0 0 10 10">
            <polyline points="0,0 , 10,10" />
            <polyline points="10,0 , 0,10" />
          </svg>
        </button>
        <Wrap n={3} pack>
          {children}
        </Wrap>
      </div>
    );
  }
});

const VideoWorkaround = ({ src }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: `
    <video
      muted
      autoplay
      playsinline
      loop
      width="100%"
      name="art video"
      src="${src}"

      style="
        width: 100%;
        height: 100%;
        display: block;
        filter: brightness(0.95) sepia(0.04);
      "


      />
  `
    }}
  />
);

export default class Index extends React.Component {
  componentDidMount() {
    Favicon();
  }
  render() {
    return (
      // <div className="index">
      <div className="home">
        <HomeBrick>
          <Wrap n={5}>
            <p
              style={{
                lineHeight: "45px",
                fontSize: "40px",
                margin: 0,
                textAlign: "center"
              }}
            >
              Max Bittker
            </p>
          </Wrap>
        </HomeBrick>
        <HomeBrick>
          <div style={{ position: "relative", height: "20px" }}>
            <marquee style={{ position: "absolute", top: -5 }} scrollamount="3">
              {ribbon}
            </marquee>
            <marquee style={{ position: "absolute", top: -5 }} scrollamount="4">
              {ribbon}
            </marquee>
            <marquee style={{ position: "absolute", top: -5 }} scrollamount="5">
              {ribbon}
            </marquee>
            <marquee style={{ position: "absolute", top: -5 }} scrollamount="6">
              {ribbon}
            </marquee>
            {/* <marquee style={{ position: "absolute", top: -5 }} scrollamount="7">
              {ribbon}
            </marquee> */}
          </div>
        </HomeBrick>
        <HomeBrick>
          <p>
            Computer artist building tools for play, creativity, &
            communication.
          </p>
        </HomeBrick>
        <HomeBrick>
          <HRadio n={80} />
        </HomeBrick>

        <HomeBrick>
          <p>
            Some projects that I'm proud of:
            <br />
            <br />
            <a href="https://sandspiel.club/">Sandspiel</a>, a falling sand game
            with an embedded online drawing community
            <br />
            <br />
            <a href="https://twitter.com/NYT_first_said"> @NYT_first_said </a>,
            a twitter bot that records when The New York Times says a word for
            the first time in its history.
          </p>
          <p style={{ textAlign: "right" }}>
            {/* <Link to={"/art/"}> art</Link> and weird{" "} */}
            <Link to={"/projects/"}> More projects ></Link>{" "}
          </p>
        </HomeBrick>

        <HomeBrick>
          <HRadio n={80} type="checkbox" flip />
        </HomeBrick>

        <HomeBrick>
          <p>
            You can follow me on social media if you like!
            <span
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around"
                // marginBottom: "1em"
              }}
            >
              <a href="https://twitter.com/MaxBittker">
                {" "}
                twitter <small></small>
              </a>
              <a href="https://github.com/MaxBittker">
                {" "}
                github <small></small>{" "}
              </a>
              <a href="https://www.instagram.com/maxbittker/">
                {" "}
                instagram <small></small>
              </a>
              <a href="https://goodreads.com/maxbittker">
                {" "}
                goodreads
                {/* <small>(AMZN)</small> */}
              </a>
            </span>
          </p>
        </HomeBrick>
        <HomeBrick>
          <Wrap n={2}>
            <p>
              I also blog and give talks, you can find some of that stuff over
              <Link to={"/blog/"}> here.</Link>{" "}
            </p>
          </Wrap>
        </HomeBrick>

        <HomeBrick>
          <Wrap n={8}>
            <div style={{ position: "relative" }}>
              <input
                type="range"
                min="1"
                max="9"
                defaultValue={5}
                step="0.1"
                style={{
                  // position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  verticalAlign: "middle"
                }}
                alt="focus"
                onChange={e => {
                  let value = e.target.value;
                  let style = document.getElementById("slider-style-2");
                  if (style) style.remove();
                  style = document.createElement("style");
                  style.id = "slider-style-2";
                  document.head.appendChild(style);

                  let mult = window.matchMedia("(max-width: 500px)").matches
                    ? 1
                    : 5;
                  let tot = mult * 2;
                  style.sheet.insertRule(
                    `.b-wrap {padding-top: ${(value / 5) * mult}px}`
                  );
                  style.sheet.insertRule(
                    `.b-wrap {padding-bottom: ${tot - (value / 5) * mult}px}`
                  );
                }}
              />
            </div>
          </Wrap>
        </HomeBrick>

        {/* <HomeBrick> */}
        {/* <HRadio n={80} /> */}
        {/* </HomeBrick> */}

        <HomeBrick>
          <Wrap n={8}>
            <VideoWorkaround src={plug}></VideoWorkaround>
          </Wrap>
        </HomeBrick>
        {/* <HomeBrick>
          <Wrap n={2} />
        </HomeBrick> */}
        {/* <HomeBrick>
          <Wrap n={20} />
        </HomeBrick> */}

        {/* <HomeBrick>
          <Wrap n={5}>
            <input
              placeholder="/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\"
              style={{
                width: "100%",
                verticalAlign: "middle"
              }}
              alt="focus"
            />
          </Wrap>
        </HomeBrick> */}

        {/* 
        <HomeBrick>
          <div className="scout-preview">
            <div
              className="scout-preview__content rc-scout"
              data-scout-rendered="true"
            >
              <p className="rc-scout__text">
                <i className="rc-scout__logo" /> Want to become a better
                programmer?{" "}
                <a
                  className="rc-scout__link"
                  href="https://www.recurse.com/scout/click?t=3a128824cb3dacb3e5bf25cec6f3b40e"
                >
                  Join the Recurse Center!
                </a>
              </p>
            </div>
          </div>
        </HomeBrick> */}

        <HomeBrick>
          <Wrap n={8}>
            <img alt="my face" src={face} />
          </Wrap>
        </HomeBrick>
        {/* <HomeBrick>
          <Wrap n={8}>
            <img
              src={torus}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                filter: "brightness(0.95) sepia(0.04)"
              }}
              alt="source: wikipedia user LucasVB"
            />
          </Wrap>
        </HomeBrick> */}
        <HomeBrick>
          <HRadio n={80} flip />
        </HomeBrick>
        <HomeBrick>
          <Wrap n={6}>
            <img alt="my cat pippin" src={dog} />
          </Wrap>
        </HomeBrick>
        <HomeBrick>
          <Wrap n={25}>
            <input
              type="range"
              min="1"
              max="9"
              orient="vertical"
              defaultValue={5}
              step="0.1"
              style={{
                height: "100px",
                width: "100%",
                verticalAlign: "middle"
              }}
              alt="focus"
              onChange={e => {
                let value = e.target.value;
                let style = document.getElementById("slider-style");
                if (style) style.remove();
                style = document.createElement("style");
                style.id = "slider-style";
                document.head.appendChild(style);

                let mult = window.matchMedia("(max-width: 500px)").matches
                  ? 1
                  : 5;
                let tot = mult * 2;
                style.sheet.insertRule(
                  `.b-wrap {padding-right: ${(value / 5) * mult}px}`
                );
                style.sheet.insertRule(
                  `.b-wrap {padding-left: ${tot - (value / 5) * mult}px}`
                );
              }}
            />
          </Wrap>
        </HomeBrick>
        <HomeBrick>
          <Wrap n={150} />
        </HomeBrick>
      </div>
    );
  }
}
