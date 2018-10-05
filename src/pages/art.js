import '../pages/example.less';

import {withPrefix} from 'gatsby-link';
import _ from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';
import InstagramEmbed from 'react-instagram-embed';

import data from './art.json';

const iposts = [
  'BoHPoazFQQw', 'Bnh_qtblR_E', 'BmPy1vIFsWK', 'BmM-BorFpUF', 'Bkv9_t4lDtD',
  'BkO5x2XFB4d', 'BkMTjCmlSmt', 'BkHGhiEFuK0', 'BjjAsRalv_o', 'BigTj4qFTRY',
  'Bh5per1FsEJ', 'Bh2atUflmN',  'Bhsy3q7FuyH', 'BhSyQQoA8WU', 'BgbxR6Wj29K',
  'BgaQx2iDXNT', 'BgaK_-rDgP6', 'BcZm5-Kg_sL', 'BcUIZa-At-O', 'BcUHC8fAyZv',
  'BcRzsV7grXS', 'BcFhNEoAORl', 'BbtFGAwAk2d', 'Bbs-dHjgpKS', 'BbMzrN1gq0Q',
  'BbJY58xgI3H', 'Ba3Ha-sAoYd', 'BanuIyegKtw', 'BYURQ3ng6go', 'BXe5A6TAG4R',
  'BXUbX5bAAGp', 'BXR7Ej5ANuJ', 'BXMsS91ARCg', 'BWjy7vSAHkv', 'BV-MYxOgvrA',
  'BVfOGaKAmq0', 'BVOFOGWFYn5', 'BVNyCp8F5JW', 'BU6M0AnlPIl', 'BTyFGnslsGx',
  'BSsEwCaljLZ', 'BSr_6pzFOxz', 'BSp3AeEl_0M', 'BSp1S1SlMZ9', 'BSovCWQl4ZF',
  'BSZ2CsXF6tw', 'BRkXPqAF4k8', 'BRkWobilG3s', 'BRkH1GqFf8K', 'BRj6ObglyAV',
  'BQw80pWlAXn', 'BQwMWc-F05R', 'BQvyTPMFv-C', 'BQutvtKFlaL', 'BQt8DSNlYvr',
  'BQrSnwml5fY', 'BQrH0NKlrrI', 'BQqyuDMFP-x', 'BQqtXolFqIw', 'BPzE9fhAIFU',
  'BPl4Mm7A898', 'BPl0xl2ANXF', 'BPVzIArgxqV', 'BPTsg38AyQ9', 'BOgJf9bgDXO'
].map(url => {
  return {name: 'ipost', loc: url};
});

module.exports =
    React.createClass({
      propTypes() {
        return {route: React.PropTypes.object};
      },

      componentDidMount() {
        this.expand = setInterval(() => {
          let {posts, lim} = this.state;
          this.setState({lim: lim + 3});
          if (posts.length < lim) {
            clearInterval(this.expand);
          }
        }, 1000);
      },
      getInitialState() {
        const {screenshots} = data;
        let scs = _.reverse(screenshots.slice());
        let posts = _.flatten(_.zip(iposts, scs)).filter(i => i);
        // let posts = _.shuffle(iposts.concat(data.screenshots));
        return {posts, lim: 9};
      },

      componentWillUnmount() {
        clearInterval(this.expand);
      },

      render() {
        let {posts, lim} = this.state;
        let scs = posts.slice(0, lim).map(({ name, loc }, i) => {
      let ipost = name === 'ipost';
      return (
        <div key={i} className={'art-card ' + (ipost ? 'ipost' : '')}>
          {ipost ? (
            <InstagramEmbed
              url={'https://instagr.am/p/' + loc}
              maxWidth={300}
              hideCaption={true}
              injectScript={i == 0}
              ref=''
            />
          ) : (
            <img src={withPrefix('/screenshots/' + loc)} />
          )}
        </div>
      );
    });
    return (
      <div>
        <Helmet title='artwork' />
        <h1>Visual Artwork Dump:</h1>
        {/* <h3>mostly built with clojurescript, reagent, svg, a pen plotter, and WebGL.</h3> */}

        {/* <button onClick={() => this.handleMinusClick()}>{'<'}</button> */}
        {/* <button onClick={() => this.handlePlusClick()}>{'>'}</button> */}
        <div className='art-masonry'>{scs}</div>
      </div>
    );
      }
    });
