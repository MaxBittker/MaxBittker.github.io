import React from "react";
import RcScout from "../components/rcscout.js";

import "./example.less";

export default class Games extends React.Component {
  render() {
    return (
      <div>
        <h1>Selected Links </h1>
        {/* <p>These mostly represent my personal wor</p> */}
        <a href="https://maxbittker.github.io/Hand-Held-ITP-2022/">
              "Hand Held: Creative Tools for Phones"
            </a>{" "}
          <p>Class covering the theory, design and development process of creative tools. Offered through NYU/ITP's Masters program, since 2020.</p>

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
          in 2019, and got to tweet its own name. 
          <a href="https://maxbittker.github.io/clear-pipes/">[visualization]</a>
          
        </p>
        <a href="https://maxbittker.github.io/broider/">Broider</a>
        <p>
          Fun tool for designing lo-fi "embroidered" border decorations. Border
          styles can be exported as CSS!
        </p>
        <a href="https://orb.farm">Orb.Farm</a>
        <p>
          Virtual aquarium and simulated ecosystem. Arrange materials, plants,
          and animals inside a glass orb, and watch them live out their lives
          together as a self-contained world.
        </p>
        <a href="https://studio.sandspiel.club">Sandspiel Studio</a>
        <p>
          Visual programming environment for designing new cellular automata!
          Make or remix you own Sanspiel elements, and share them with the community.
        </p>

        <a href="https://shaderbooth.com">Shaderbooth</a>
        <p>
          Live-coding environment for writing and sharing indie face filters in
          GLSL.
        </p>

        <a href="https://walky.space">walky.space</a>
        <p>
      Online lo-fi spatial image gallery builder.        
        </p>
        <p>
        <h3> Roblox Games:</h3>
        <a href="https://www.roblox.com/games/7000824340/Melon-Rancher/">Melon Rancher</a> <br />
        <a href="https://www.roblox.com/games/7019688123/Sheep-Dog-Simulator">Sheep Dog Simulator</a> <br />
        <a href="https://www.roblox.com/games/7123914887/Dont-Shot-Anyone">Don't Shot Anyone</a> <br />
        </p>
        <p>
        
          <h3> Miscellaneous toys & experiments:</h3>
          <a href="https://max-notes.vercel.app/">Notes</a><br/>
          <a href="https://csb-s0xhs.netlify.com/">🅗🅨🅟🅔🅡 🅟🅞🅟</a> <br />
          <a href="https://maxbittker.github.io/div-mitosis/">
            Div Mitosis
          </a>{" "}
          <br />
          <a href="https://maxbittker.github.io/alphabet-soup/">
            Magnetic Alphabet Soup
          </a>
          <br />
          <a href="https://maxbittker.github.io/kinematic-typewriter/">
            Kinematic Typewriter
          </a>
          <br />
          <a href="https://maxbittker.github.io/divloom/">Div Loom</a> <br />
          <a href="https://maxbittker.github.io/touch-reveal/">
            Scratch & Sniff
          </a>
          <br />
          <a href="https://maxbittker.github.io/noise-draw/">Draw With Noise</a>
          <br />
          <a href="https://maxbittker.github.io/soft-touch/">Touch Draw</a>{" "}
          <br />
          <a href="https://maxbittker.github.io/glitter/">
            Scrolling Glitter
          </a>{" "}
          <br />
        </p>
        <p>other links:</p>
        <a href="http://maxbittker.github.io/fridgepoet/">Fridge Poet</a>
        <p>
          A web toy for writing fridge-magnet style poetry. Word suggestions are
          based on markov chain analysis of famous poets.
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
        <a href="https://maxbittker.github.io/pico-8-plink/plink.p8.html">
          Hunt Night
        </a>
        <p>A short story game built in pico-8. (hold x to draw bow)</p>
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
          Two player game exploring cooperation and the tradgedy of the commons
        </p>
        <br />
        <p>
          
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
