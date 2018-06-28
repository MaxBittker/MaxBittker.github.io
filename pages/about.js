import React from "react";
import { Link } from "react-router";
import { prefixLink } from "gatsby-helpers";
import Helmet from "react-helmet";
import { config } from "config";
import WebGL from "../components/webgl.js";
import RcScout from "../components/rcscout.js";

import "./example.less";

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Helmet title={config.siteTitle} />
       
        <marquee>
          <h1>
            Welcome to my web page &lt;/marquee&gt;
            {/* &lt;/marque> ^C exit :wq! ^D &lt;/markee> &lt;/scroll> &lt;/marky> */}
          </h1>
        </marquee>
        <p>
          I'm a person & developer thinking about art, learning, computation,
          communities and systems. Previously, I worked at Sentry, writing open
          source tools to help people find and fix errors.
        </p>
        <p>
          Thanks for stopping by... maybe I could interest you in some fine
          corporate-owned hyperlinks?
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "1em"
          }}
        >
          <a href="https://twitter.com/MaxBittker"> twitter </a>
          <a href="https://github.com/MaxBittker"> github </a>
          <a href="https://goodreads.com/maxbittker"> goodreads </a>
          <a href="https://www.instagram.com/maxbittker/"> instagram </a>
        </div>

        <p> Or in a few projects of mine?</p>
        <a href="https://twitter.com/NYT_first_said"> New New York Times </a>
        <p>
          A twitter bot that records the first time The New York Times says a
          new word.
        </p>
        <a href="https://maxbittker.github.io/webcam-sketches/slowlinescan/">
          Webcam Shader Sketches{" "}
        </a>
        <p>
          A collection of filters you can interact with via video input from
          your webcam. Implemented as fragment shaders using with regl and
          glslify.
        </p>
        <a href="http://159.203.112.6:8888/"> Spotify Song Block</a>
        <p>
          A small webservice for blocking songs, artists, or albums on Spotify.
        </p>
        <a href="http://maxbittker.github.io/pond/">Pond</a>
        <p>
          An agent-based neuro-genetic simulation. Creatures are controlled by a
          neural network and over time the population evolves to efficiently
          find food.
        </p>
        <a href="http://maxbittker.github.io/fridgepoet/">Fridge Poet</a>
        <p>
          A web toy for writing fridge-magnet style poetry. Word suggestions are
          based on markov chain analysis of famous poets, and you can select
          which model to run.
        </p>
        <a href="http://maxbittker.github.io/Mojulo/">Mojulo</a>
        <p>
          Lo-fi math function visualization sandbox. Check out the{" "}
          <a href="http://maxbittker.github.io/Mojulo/gallery.html">gallery</a>.
        </p>
        <p>
          Other interests: simulation, software design, lisp, weird videogames,
          democratized & distributed computing, biking, cooking, electronics,
          fiction, folk punk / post rock / hip hop, intersectional feminism,
          math, twitter bots, unix, vegetables, machine learning, graphics,
          watercolors
        </p>
        <RcScout />
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <marquee
              behavior="alternate"
              direction="down"
              style="
              position: absolute;
              width: 100%;
              height: 100vh;
              left:0;"
              >
              <marquee behavior="alternate">
                  <img
                   src="./moon.jpag"
                   width:"0";
                   height:"0";
                   margin-bottom:"0"/>
                   thanks for visiting
              </marquee>
            </marquee>
`
          }}
        />
      </div>
    );
  }
}
