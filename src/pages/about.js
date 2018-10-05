import React from "react";
import RcScout from "../components/rcscout.js";
import HRadio from "../components/hradio.js";
import "./example.less";

export default class About extends React.Component {
  render() {
    return (
      <div>
        <marquee>
          <h1>Welcome to my web page &lt;/marquee&gt;</h1>
          <HRadio n={80} />
        </marquee>

        <p>
          I'm a developer & artist interested in democratized, distributed, and
          de-militarized computing.
        </p>
        <p>
          That sounds cool but it's mostly aspirational. I do make art and some
          weird computer programs sometimes though, you can find some of that this website and on my social media.
        </p>
        <p>I also care a lot about learning, community, and communication</p>
        <p>
          I used to work at Sentry, writing open source tools to help people
          find and fix errors. Lately, I'm employed by Google, doing stuff on
          the Fuchsia operating system.
        </p>
        <p>
          Thank you for taking the time to stop by... perhaps I could interest
          you in some hyperlinks?
        </p>
        <div
          style={{
            display: "flex",
            flexWrap:"wrap",
            justifyContent: "space-around",
            marginBottom: "1em"
          }}>
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
          Other interests: programming languages, weird videogames, riding a
          bike, cooking, electronics, fiction, folk punk, intersectional
          feminism, anarchism, math, operating systems, vegetables, graphics,
          watercolors
        </p>
        <marquee>
          <HRadio n={100} />
        </marquee>
        <RcScout />
      </div>
    );
  }
}
