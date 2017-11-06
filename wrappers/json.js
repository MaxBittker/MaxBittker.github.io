import React from 'react';
import Helmet from 'react-helmet';
import {config} from 'config';
import {prefixLink} from 'gatsby-helpers';
import InstagramEmbed from 'react-instagram-embed';
import _ from 'lodash';

import '../pages/example.less';
const iposts = [
  'Ba3Ha-sAoYd',
  'BanuIyegKtw',
  'BYURQ3ng6go',
  'BXe5A6TAG4R',
  'BXUbX5bAAGp',
  'BXR7Ej5ANuJ',
  'BXMsS91ARCg',
  'BWjy7vSAHkv',
  'BV-MYxOgvrA',
  'BVfOGaKAmq0',
  'BVOFOGWFYn5',
  'BVNyCp8F5JW',
  'BU6M0AnlPIl',
  'BTyFGnslsGx',
  'BSsEwCaljLZ',
  'BSr_6pzFOxz',
  'BSp3AeEl_0M',
  'BSp1S1SlMZ9',
  'BSovCWQl4ZF',
  'BSZ2CsXF6tw',
  'BRkXPqAF4k8',
  'BRkWobilG3s',
  'BRkH1GqFf8K',
  'BRj6ObglyAV',
  'BQw80pWlAXn',
  'BQwMWc-F05R',
  'BQvyTPMFv-C',
  'BQutvtKFlaL',
  'BQt8DSNlYvr',
  'BQrSnwml5fY',
  'BQrH0NKlrrI',
  'BQqyuDMFP-x',
  'BQqtXolFqIw',
  'BPzE9fhAIFU',
  'BPl4Mm7A898',
  'BPl0xl2ANXF',
  'BPVzIArgxqV',
  'BPTsg38AyQ9',
  'BOgJf9bgDXO'
].map(url => {
  return {name: 'ipost', loc: url};
});

module.exports = React.createClass({
  propTypes() {
    return {
      route: React.PropTypes.object
    };
  },

  componentDidMount(){
    this.expand = setInterval(()=>{
      let {posts,lim} = this.state;
      this.setState({lim:lim+9})
      if(posts.length<lim){
        clearInterval(this.expand)
      }
    }, 500)
  },

  getInitialState() {
    const data = this.props.route.page.data;
    let posts = _.flatten(_.zip(iposts,_.reverse(data.screenshots))).filter(i=>i);
    // let posts = _.shuffle(iposts.concat(data.screenshots));
    return {posts, lim:9};
  },


  render() {
    let {posts, lim } = this.state;
    let scs = posts.slice(0,lim).map(({name, loc}, i) => {
      let ipost = name === 'ipost';
      return (
        <div key={i} className={"art-card " + (ipost ? "ipost" : "")}>
          {ipost
            ? <InstagramEmbed
                url={'https://instagr.am/p/' + loc}
                maxWidth={300}
                hideCaption={true}
                ref=""
              />
            : <img src={prefixLink('/screenshots/' + loc)} />}
        </div>
      );
    });
    return (
      <div>
        <Helmet title="artwork" />
        <h1>Generative Artwork</h1>
        {/* <h3>mostly built with clojurescript, reagent, svg, a pen plotter, and WebGL.</h3> */}

        {/* <button onClick={() => this.handleMinusClick()}>{'<'}</button> */}
        {/* <button onClick={() => this.handlePlusClick()}>{'>'}</button> */}
        <div className="art-masonry">
          {scs}
        </div>
      </div>
    );
  }
});
