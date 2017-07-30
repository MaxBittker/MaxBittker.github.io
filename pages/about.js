import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import WebGL from '../components/webgl.js'
import RcScout from '../components/rcscout.js'

import './example.less'

export default class About extends React.Component {
  componentDidMount(){

    try{
    (function(w, d) {
      // if (w._rcs) return;
      w._rcs = {token: '3a128824cb3dacb3e5bf25cec6f3b40e', type: 'logo_and_text'};
      var s = d.createElement('script');
      s.async = true;
      s.src = 'https://d29xw0ra2h4o4u.cloudfront.net/assets/scout-abf0d3bb3b3069aa3be4d42c386bc25aaf3e1c65c9ba702717b7118f8acdb221.js';
      d.body.appendChild(s);
      })(window, document);
    }catch(e){
      console.log(e)
    }

  }
  render () {
    return (
      <div>
        <Helmet
          title={config.siteTitle}
        />
        <h1>Hello!</h1>
        <p>
        I'm a person & developer excited about art, learning, computation, and systems.
        Lately, I work at Sentry, writing open source tools to help people find and fix errors.
        </p>
        <div style={{
          display:'flex',
          justifyContent: 'space-around',
          marginBottom:'1em',
        }}>
        {/* <span>
          you can click buttons:
        </span> */}
        <a href='https://twitter.com/MaxBittker'> twitter </a>
        <a href='https://github.com/MaxBittker'> github </a>
        <a href='https://goodreads.com/maxbittker'> goodreads </a>
        <a href='https://www.instagram.com/maxbittker/'> instagram </a>
        </div>

        <h4>A few projects:</h4>
        <a href="http://maxbittker.github.io/pond/" >Pond</a>
        <p>
          An agent-based neuro-genetic simulation. Creatures are controlled by a neural network and over time the population evolves to efficiently find food.
        </p>
        <a href="http://maxbittker.github.io/fridgepoet/" >Fridge Poet</a>
        <p>
        A web toy for writing fridge-magnet style poetry. Word suggestions are based on markov chain analysis of famous poets, and you can select which model to run.
        </p>
        <a href="http://maxbittker.github.io/Mojulo/" >Mojulo</a>
        <p>
        Lo-fi math function visualization sandbox. Check out the <a href="http://maxbittker.github.io/Mojulo/gallery.html" >gallery</a>.
        </p>
        <a href="https://twitter.com/NYT_first_said"> New New York Times </a>
        <p>
         A twitter bot that records the first time The New York Times says a new word. (WIP)
        </p>
        <a href="https://maxbittker.github.io/lunarbocce/"> Lunar Bocce </a>
        <p>
          The beautiful game of Bocce ball, in space, for two+ players.
        </p>
        <a href="http://maxbittker.github.io/dust/" >Dust</a>
        <p>
          Homage to the falling sand genre of games.
        </p>
        <p>
          Other interests:
          simulation, software design, lisp, weird videogames, democratized computing, biking, cooking, electronics, fiction, folk punk / post rock / hip hop, intersectional feminism, math, netrunner, running, starcraft, twitter bots, unix, vegetables, machine learning, graphics, watercolors
        </p>
        <RcScout/>
      </div>
        )
  }
}
