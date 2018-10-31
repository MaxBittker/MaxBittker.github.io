import React from "react";
import RcScout from "../components/rcscout.js";

import "./example.less";

export default class Games extends React.Component {
  render() {
    return (
      <div>
        <h1>Projects</h1>
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
        <RcScout />
      </div>
    );
  }
}
