import React from "react";
import RcScout from "../components/rcscout.js";

import "./example.less";

export default class Games extends React.Component {
  render() {
    return (
      <div>
        <h1>Projects & Games</h1>
        <a href="https://sandspiel.club/">Sandspiel</a>
        <p>
          Loving homage to the falling sand genre of games. Online interactive
          sandbox and lovable chaotic artistic community. Built in Rust+WebGL.
        </p>
        <a href="https://twitter.com/NYT_first_said"> New New York Times </a>
        <p>
          A twitter bot that records the first time The New York Times says a
          new word.
          <a href="https://www.nytimes.com/2019/07/07/reader-center/nyt-first-said-words-twitter-bot.html?searchResultPosition=1">
            {" "}
            Covered by the NYT
          </a>{" "}
          in 2019, and got to tweet its own name. &nbsp;
          <a href="https://maxbittker.github.io/nyt-first-said/">[more info]</a>
        </p>
        <a href="https://maxbittker.github.io/webcam-sketches/slowlinescan/">
          Webcam Shader Sketches{" "}
        </a>
        <p>
          A collection of filters you can interact with via video input from
          your webcam. Implemented as fragment shaders using with regl and
          glslify.
        </p>
        <a href="http://maxbittker.github.io/fridgepoet/">Fridge Poet</a>
        <p>
          A web toy for writing fridge-magnet style poetry. Word suggestions are
          based on markov chain analysis of famous poets, and you can select
          which model to run.
        </p>
        {/* <a href="http://159.203.112.6:8888/"> Spotify Song Block</a>
        <p>
          A small webservice for blocking songs, artists, or albums on Spotify.
        </p> */}
        <a href="http://maxbittker.github.io/pond/">Pond</a>
        <p>
          An agent-based neuro-genetic simulation. Creatures are controlled by a
          neural network and over time the population evolves to efficiently
          find food.
        </p>

        <a href="http://maxbittker.github.io/Mojulo/">Mojulo</a>
        <p>
          Lo-fi math function visualization sandbox. Check out the{" "}
          <a href="http://maxbittker.github.io/Mojulo/gallery.html">gallery</a>.
        </p>

        <a href="http://maxbittker.github.io/orbs/">Hyper-Pop</a>
        <p>Tactile recursive pastel rainbow fidget toy.</p>

        <a href="https://maxbittker.github.io/pico-8-plink/plink.p8.html">
          Hunt Night
        </a>
        <p>A short story game built in pico-8.</p>
        <a href="https://www.flickgame.org/play.html?p=07885489aad75d09629dd9c52c07a229&a=1">
          Can't Sleep
        </a>
        <p>A flick game about insomnia.</p>
        <a href="https://maxbittker.github.io/lunarbocce/"> Lunar Bocce </a>
        <p>The beautiful game of Bocce ball, in space, for two+ players.</p>

        <a href="http://maxbittker.github.io/fish/">
          Ethical Fishing Simulator
        </a>
        <p>
          Local two player game exploring tradgedy of the commons, with a cool
          flocking algorithm.
        </p>

        <a href="http://maxbittker.github.io/orbs/">Orbs</a>
        <p>
          This is an interactive swirling particle simulator that reacts to
          touch.
        </p>
        {/* 
        <a href="https://www.flickgame.org/play.html?p=62d3c6019d3482bb259f239ccd51ef85&a=1">
          Phone Brain
        </a>
        <p>A flickgame about phone looking.</p> */}

        <RcScout />
      </div>
    );
  }
}
