import "../pages/example.less";

import { withPrefix } from "gatsby-link";
import _ from "lodash";
import React from "react";
import Helmet from "react-helmet";
import createReactClass from "create-react-class";

import data from "./art.json";

const VideoWorkaround = ({ src }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: `
    <video
      muted
      autoplay
      playsinline
      loop
      controls
      width="100%"
      name="art video"
      src="${src}"
      />
  `
    }}
  />
);

export default createReactClass({
  propTypes() {
    return { route: React.PropTypes.object };
  },

  componentDidMount() {
    this.expand = setInterval(() => {
      let { posts, lim } = this.state;
      this.setState({ lim: lim + 2 });
      if (posts.length < lim) {
        clearInterval(this.expand);
      }
    }, 2000);
  },
  getInitialState() {
    const { screenshots } = data;
    let scs = _.reverse(screenshots.slice());
    let posts = scs.filter(i => i);
    posts = _.shuffle(posts);
    return { posts, lim: 9 };
  },

  componentWillUnmount() {
    clearInterval(this.expand);
  },

  render() {
    let { posts, lim } = this.state;
    let scs = posts.slice(0, lim).map(({ type, loc }, i) => {
      let isVideo = type === ".mp4";
      return (
        <div key={i} className={"art-card"}>
          {isVideo ? (
            <VideoWorkaround src={withPrefix("/screenshots/" + loc)} />
          ) : (
            <img
              src={withPrefix("/screenshots/" + loc)}
              alt="generatative art"
            />
          )}
        </div>
      );
    });
    return (
      <div>
        <Helmet title="artwork" />
        <h1>Visual Artwork Dump:</h1>
        <div className="art-masonry">{scs}</div>
      </div>
    );
  }
});
