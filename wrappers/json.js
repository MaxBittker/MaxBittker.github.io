import React from 'react';
import Helmet from 'react-helmet';
import {config} from 'config';
import {prefixLink} from 'gatsby-helpers';
import InstagramEmbed from 'react-instagram-embed';

import '../pages/example.less';

const iposts = [
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

  getInitialState() {
    return {count: 0};
  },

  handlePlusClick() {
    this.setState({count: this.state.count + 1});
  },

  handleMinusClick() {
    this.setState({count: this.state.count - 1});
  },

  render() {
    const data = this.props.route.page.data;
    let posts = iposts.concat(data.screenshots);
    let scs = posts.map(({name, loc}, i) => {
      return (
        <div
          key={i}
          style={{
            // height: '80%',
            width: '30%',
            minWidth: '200px',
            margin: 'auto'
          }}
        >
          {/* <h3> {name}</h3> */}
          {name === 'ipost'
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
        <Helmet title={`${config.siteTitle} | ${data.title}`} />
        <h1>Generative Artwork</h1>
        {/* <h3>mostly built with clojurescript, reagent, svg, a pen plotter, and WebGL.</h3> */}

        {/* <button onClick={() => this.handleMinusClick()}>{'<'}</button> */}
        {/* <button onClick={() => this.handlePlusClick()}>{'>'}</button> */}
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {scs}
        </div>
      </div>
    );
  }
});
