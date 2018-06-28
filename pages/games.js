import React from "react";
import { Link } from "react-router";
import { prefixLink } from "gatsby-helpers";
import Helmet from "react-helmet";
// import { config } from "config";
import RcScout from "../components/rcscout.js";

import "./example.less";

export default class Games extends React.Component {
  render() {
    return (
      <div>
        {/* <Helmet title={config.siteTitle} /> */}

        <h1>"Games"</h1>
        <a href="https://maxbittker.github.io/pico-8-plink/plink.p8.html">
          Hunt Night
        </a>
        <p>A short story game built in pico-8.</p>
        <a href="https://www.flickgame.org/play.html?p=07885489aad75d09629dd9c52c07a229&a=1">
          Can't Sleep
        </a>
        <p>A flickgame about insomnia.</p>
        <a href="http://maxbittker.github.io/dust/">Dust</a>
        <p>Homage to the falling sand genre of games.</p>
        <a href="https://maxbittker.github.io/thumbsport/"> Thumbsport </a>
        <p>
          A local multiplayer game built with WebGL and JS. Warning: autoplaying
          8bit jazz, and requires gamepads to play. Laser socks demake.
        </p>
        <a href="https://maxbittker.github.io/lunarbocce/"> Lunar Bocce </a>
        <p>The beautiful game of Bocce ball, in space, for two+ players.</p>
        <a href="https://www.flickgame.org/play.html?p=62d3c6019d3482bb259f239ccd51ef85&a=1">
          Phone Brain
        </a>
        <p>A flickgame about how PHONES are BAD.</p>
        <a href="https://www.flickgame.org/play.html?p=33819dc9191248a8661afd5a57ad2f80&a=1">
          Tomato Tomato
        </a>
        <p>A flickgame about eating tomatos with salt.</p>

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
          what are games
              </marquee>
            </marquee>
`
          }}
        />
      </div>
    );
  }
}
