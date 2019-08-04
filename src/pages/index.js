import React from "react";
import Raven from "raven-js";
import createReactClass from "create-react-class";
import Link from "gatsby-link";

// import WebGL from "../components/webgl.js";

import "./example.less";
// import Loom from "../components/loom.js";
import HRadio from "../components/hradio.js";

import Wrap from "../components/wrap";
import face from "./face/face.jpg";
import torus from "./face/point_cloud_torus.mp4";
import dog from "./face/dog.jpg";
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
            parentElement.style = "filter:blur(1px) brightness(0.8);";
            window.setTimeout(() => {
              parentElement.style = "display:none;";
            }, 150);
          }}
        >
          x
        </button>
        <Wrap n={3} pack>
          {children}
        </Wrap>
      </div>
    );
  }
});

export default class Index extends React.Component {
  render() {
    return (
      // <div className="index">
      <div className="home">
        <HomeBrick>
          <Wrap n={5}>
            <p style={{ fontSize: "40px", margin: 0, textAlign: "center" }}>
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
            I'm a developer & artist interested in honest, human, and
            de-militarized computing.
          </p>
          <p>
            That sounds cool but it's mostly aspirational. I do make
            <Link to={"/art/"}> art</Link> and weird{" "}
            <Link to={"/projects/"}> computer programs</Link> sometimes though.
          </p>
        </HomeBrick>
        <HomeBrick>
          <HRadio n={80} />
        </HomeBrick>

        <HomeBrick>
          <p>
            Some of my projects that I'm most proud of are<br />
            <a href="https://sandspiel.club/">Sandspiel</a>, a falling sand game
            with a chaotic & loveable online drawing community <br />{" "}
            <big>&</big>
            <a href="https://twitter.com/NYT_first_said"> @NYT_first_said </a>
            , a twitter bot that records when The New York Times says a word for
            the first time in its history.
          </p>
        </HomeBrick>

        <HomeBrick>
          <HRadio n={80} type="checkbox" flip />
        </HomeBrick>

        <HomeBrick>
          <p>You can follow me on social media if you like!</p>
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
              twitter <small>(TWTR)</small>
            </a>
            <a href="https://github.com/MaxBittker">
              {" "}
              github <small>(MSFT)</small>{" "}
            </a>
            <a href="https://www.instagram.com/maxbittker/">
              {" "}
              instagram <small>(FB)</small>
            </a>
            <a href="https://goodreads.com/maxbittker">
              {" "}
              goodreads <small>(AMZN)</small>
            </a>
          </div>
        </HomeBrick>
        <HomeBrick>
          <Wrap n={5}>
            <input
              type="range"
              min="0"
              max="10"
              defaultValue="3"
              step="0.01"
              style={{
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
                style.sheet.insertRule(`.b-wrap {padding: ${value}px}`);
              }}
            />
          </Wrap>
        </HomeBrick>
        <HomeBrick>
          <p>
            I've also written a small number of{" "}
            <Link to={"/blog/"}> blog posts & talks</Link>.
          </p>
        </HomeBrick>
        <HomeBrick>
          <HRadio n={80} />
        </HomeBrick>
        <HomeBrick>
          <Wrap n={2} />
        </HomeBrick>
        <HomeBrick>
          <Wrap n={3}>
            <img alt="my face" src={face} />
          </Wrap>
        </HomeBrick>
        <HomeBrick>
          <Wrap n={20} />
        </HomeBrick>
        <HomeBrick>
          <Wrap n={6}>
            <img alt="my cat pippin" src={dog} />
          </Wrap>
        </HomeBrick>

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
        </HomeBrick>
        <HomeBrick>
          <Wrap n={8}>
            <video
              preload="auto"
              playsInline
              muted
              src={torus}
              type="video/mp4"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                filter: "brightness(0.95) sepia(0.04)"
              }}
              alt="source: wikipedia user LucasVB"
              autoPlay
              loop
            />
          </Wrap>
        </HomeBrick>
        <HomeBrick>
          <HRadio n={80} flip />
        </HomeBrick>

        <HomeBrick>
          <Wrap n={150} />
        </HomeBrick>
      </div>
    );
  }
}
