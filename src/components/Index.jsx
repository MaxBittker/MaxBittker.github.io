import React, { useRef, useEffect, useState } from "react";
import Raven from "raven-js";
import Favicon from "./favicon.js";
import { Shelf } from "./Bookshelf.jsx";
// import WebGL from "../components/webgl.js";

// import Loom from "../components/loom.js";
import HRadio from "./HRadio.jsx";

import Wrap from "./Wrap.jsx";
import face from "../assets/face/face.jpg?url";
import dog from "../assets/face/dog.jpg?url";
import plug from "../assets/face/plug.mp4";
import tweetsData from "../data/filtered_tweets";
const withPrefix = (s) => s;
Raven.config("https://00f21757ccfe49a49742d4f9d7f1ab30@sentry.io/1234724", {
  release: "2.0.0",
  enviroment: "production",
}).install();
const ribbon =
  "•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•";
const HomeBrick = ({ children, hideOnMobile, onClose, rings = 4 }) => {
    return (
      <div className={`home-brick ${hideOnMobile ? "desktopOnly" : " "}`}>
        <button
          className="x"
          tabIndex="-1"
          onClick={(e) => {
            let parentElement = e.target.parentElement;
            // parentElement.style = "transform: scaleX(1.00) scaleY(0.99);";
            parentElement.style = "opacity:0.4;";
            window.setTimeout(() => {
              parentElement.style = "display:none;";
              if (onClose) onClose();
            }, 150);
          }}
        >
          <svg height="11" width="11" id="d" viewBox="0 0 11 11">
            <polyline points="0,0 , 11,11" />
            <polyline points="11,0 , 0,11" />
          </svg>
        </button>
        <Wrap n={rings - 1} pack>
          {children}
        </Wrap>
      </div>
    );
};

const VideoWorkaround = ({ src }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: `
    <video
      muted
      autoplay
      playsinline
      loop
      width="100%"
      name="art video"
      src="${src}"

      style="
        width: 100%;
        height: 100%;
        display: block;
      "


      />
  `,
    }}
  />
);

const useBbox = () => {
  const ref = useRef();
  const [bbox, setBbox] = useState({});

  const set = () =>
    setBbox(ref && ref.current ? ref.current.getBoundingClientRect() : {});

  useEffect(() => {
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  return [bbox, ref];
};

const QuestionsButton = ({}) => {
  const [bbox, ref] = useBbox();

  return (
    <a href="/questions/">
      <svg
        ref={ref}
        height="50"
        width="200"
        id="d"
        viewBox={`0 0 ${bbox.width} ${bbox.height}`}
        style={{ width: "calc(100% + 8px)", height: "100%", margin: -4 }}
      >
        <polyline
          points={`0,0 , ${bbox.width / 2},${bbox.height - 2}`}
          stroke="black"
        />
        <polyline
          points={`${bbox.width},0 , ${bbox.width / 2},${bbox.height - 2}`}
          stroke="black"
        />
      </svg>
      <p
        style={{
          margin: 0,
          textAlign: "center",
        }}
      >
        Questions
      </p>
    </a>
  );
};

// Component for rendering random media from filtered_tweets
const RandomMediaItem = ({ tweet }) => {
  const { id_str, extended_entities } = tweet;
  if (!extended_entities || !extended_entities.media) return null;
  
  const media = extended_entities.media[0];
  const isVideo = media.type === "video" || media.type === "animated_gif";
  const mediaFilename = media.media_url ? media.media_url.split('/').pop() : "";
  const assetPath = `/good_assets/${id_str}-${mediaFilename}`;
  
  // Get video source if it's a video
  const getVideoSource = () => {
    if (media.video_info && media.video_info.variants) {
      const mp4Variants = media.video_info.variants.filter(
        variant => variant.content_type === "video/mp4"
      );
      
      const sortedVariants = mp4Variants.sort(
        (a, b) => (b.bitrate || 0) - (a.bitrate || 0)
      );
      
      // Use the locally rehosted copy of the best quality variant
      // (video.twimg.com no longer allows hotlinking)
      if (sortedVariants.length > 0) {
        const base = sortedVariants[0].url.split("/").pop().split("?")[0];
        return withPrefix(`/good_assets/${id_str}-${base}`);
      }
    }

    return withPrefix(assetPath);
  };
  
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {isVideo ? (
        <video 
          autoPlay
          muted
          loop
          src={getVideoSource()}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            filter: "brightness(0.95) sepia(0.04)",
          }}
        />
      ) : (
        <img
          src={withPrefix(assetPath)}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            filter: "brightness(0.95) sepia(0.04)",
            objectFit: "cover"
          }}
          alt=""
        />
      )}
    </div>
  );
};

// Component to display random tweets
const RandomTweets = () => {
  const [displayedTweets, setDisplayedTweets] = useState([]);
  const [queuedTweets, setQueuedTweets] = useState([]);

  // Handle when an item is closed
  const handleClose = (closedId) => {
    // Remove the closed tweet
    setDisplayedTweets(prev => prev.filter(item => item.tweet.id_str !== closedId));
    
    // Add a new tweet from the queue if available
    if (queuedTweets.length > 0) {
      const nextTweet = queuedTweets[0];
      const remainingQueue = queuedTweets.slice(1);

      // Add to displayed and remove from queue
      setDisplayedTweets(prev => [...prev, nextTweet]);
      setQueuedTweets(remainingQueue);
    }
  };
  
  useEffect(() => {
    // Filter tweets with media
    const tweetsWithMedia = tweetsData.filter(
      item => item.tweet.extended_entities && item.tweet.extended_entities.media
    );
    
    // Shuffle all tweets, giving each a random 1-3 rings
    const shuffled = [...tweetsWithMedia]
      .sort(() => 0.5 - Math.random())
      .map((item) => ({ ...item, rings: 1 + Math.floor(Math.random() * 3) }));

    // Take first 10 for display and rest for queue
    setDisplayedTweets(shuffled.slice(0, 10));
    setQueuedTweets(shuffled.slice(10));
  }, []);

  return (
    <>
      {displayedTweets.map((tweetItem) => {
        const tweetId = tweetItem.tweet.id_str;

        return (
          <HomeBrick
            key={tweetId}
            rings={tweetItem.rings}
            onClose={() => handleClose(tweetId)}
          >
            <RandomMediaItem tweet={tweetItem.tweet} />
          </HomeBrick>
        );
      })}
    </>
  );
};

export default class Index extends React.Component {
  componentDidMount() {
    window.setInterval(() => Favicon(), 333);
    Favicon();
  }
  render() {
    // return <iframe id="fullFrame" src="https://postcard.maxbittker.repl.co/"></iframe>
    return (
      // <div className="index">
      <div className="home">
        <HomeBrick>
          <Wrap n={5}>
            <QuestionsButton />
          </Wrap>
        </HomeBrick>
        <HomeBrick>
          <div style={{ position: "relative", height: "20px" }}>
            <marquee style={{ position: "absolute", top: -5 }} scrollamount="3">
              {ribbon}
            </marquee>
            <marquee style={{ position: "absolute", top: -5 }} scrollamount="4">
              {ribbon}
            </marquee>
            <marquee style={{ position: "absolute", top: -5 }} scrollamount="1">
              {ribbon}
            </marquee>
            <marquee style={{ position: "absolute", top: -5 }} scrollamount="2">
              {ribbon}
            </marquee>
            {/* <marquee style={{ position: "absolute", top: -5 }} scrollamount="7">
              {ribbon}
            </marquee> */}
          </div>
        </HomeBrick>
        <HomeBrick>
          <p>Building tools for creative learning at <a href="https://websim.com/">Websim.com</a></p>
          <p>
            Teaching:<br></br>{" "}
            <a href="https://maxbittker.github.io/Hand-Held-ITP-2021/">
              "Hand Held: Creative Tools for Phones"
            </a>{" "}
          </p>
        </HomeBrick>
        <HomeBrick>
          <HRadio n={30} />
        </HomeBrick>

        <HomeBrick>
          <p>
            <a href="https://sandspiel.club/">Sandspiel</a> is a falling sand
            game with an embedded online drawing community
            <br />
            <br />
            <a href="https://twitter.com/NYT_first_said"> @NYT_first_said </a>
            is a twitter bot that records when The New York Times says a word
            for the first time in its history.
          </p>
          <p style={{ textAlign: "right" }}>
            {/* <a href={"/art/"}> art</a> and weird{" "} */}
            <a href={"/projects/"}> More projects →</a>{" "}
          </p>
        </HomeBrick>

        <HomeBrick>
          <HRadio n={30} type="checkbox" flip />
        </HomeBrick>
        {/* <HomeBrick>
          <Wrap n={2}>
          <p>
            
             
              and 
            </p>
          </Wrap>
        </HomeBrick> */}
        <HomeBrick>
          <p>
            <span
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                // marginBottom: "1em"
              }}
            >
              {/* <a href={"/bookshelf/"}> shelf </a> */}
              <a href={"/blog/"}> blog </a>
              <a href="https://twitter.com/MaxBittker">twitter</a>
              <a href="https://github.com/MaxBittker">github</a>
              <a href="https://www.instagram.com/maxbittker/">instagram</a>
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            <a href="mailto:maxbittker@gmail.com">maxbittker@gmail.com</a>
          </p>
        </HomeBrick>
        <HomeBrick>
          <a href={"/bookshelf/"}>
            <Shelf />
          </a>
        </HomeBrick>
        <HomeBrick>
          <Wrap n={5}>
            <input
              type="range"
              min="1"
              max="9"
              defaultValue={1}
              step="0.1"
              style={{
                // position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                verticalAlign: "middle",
              }}
              alt="focus"
              onChange={(e) => {
                let value = e.target.value;
                let style = document.getElementById("slider-style");
                if (style) style.remove();
                style = document.createElement("style");
                style.id = "slider-style";
                document.head.appendChild(style);
                window.l = value;
                style.sheet.insertRule(
                  `* {border-radius: ${Math.pow(
                    value,
                    window.innerWidth > 800 ? 2.5 : 1.9
                  )}px}`
                );
              }}
            />
          </Wrap>
        </HomeBrick>
        {/* <HomeBrick> */}
        {/* <HRadio n={30} /> */}
        {/* </HomeBrick> */}

        <HomeBrick>
          <Wrap n={8}>
            <VideoWorkaround src={plug}></VideoWorkaround>
          </Wrap>
        </HomeBrick>
        {/* <HomeBrick>
          <Wrap n={2} />
        </HomeBrick> */}
        {/* <HomeBrick>
          <Wrap n={20} />
        </HomeBrick> */}

        {/* 
        <HomeBrick>
          <div className="scout-preview">
            <div
              className="scout-preview__content rc-scout"
              data-scout-rendered="true"
            >
              <p className="rc-scout__text">
                <i className="rc-scout__logo" /> Want to become a better
                programmer?{" "}
                <a
                  className="rc-scout__link"
                  href="https://www.recurse.com/scout/click?t=3a128824cb3dacb3e5bf25cec6f3b40e"
                >
                  Join the Recurse Center!
                </a>
              </p>
            </div>
          </div>
        </HomeBrick> */}

        <HomeBrick>
          <Wrap n={9}>
            <img alt="my face" src={face} />
          </Wrap>
        </HomeBrick>
        <HomeBrick>
          <HRadio n={30} flip />
        </HomeBrick>
        {/* <HomeBrick>
          <Wrap n={6}>
            <img alt="my cat pippin" src={dog} />
          </Wrap>
        </HomeBrick> */}
        {/* <HomeBrick>
          <Wrap n={8}>
            <div style={{ position: "relative" }}>
              <input
                type="range"
                min="1"
                max="9"
                defaultValue={5}
                step="0.1"
                style={{
                  // position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  verticalAlign: "middle"
                }}
                alt="focus"
                onChange={e => {
                  let value = e.target.value;
                  let style = document.getElementById("slider-style-2");
                  if (style) style.remove();
                  style = document.createElement("style");
                  style.id = "slider-style-2";
                  document.head.appendChild(style);

                  let mult = window.matchMedia("(max-width: 500px)").matches
                    ? 1
                    : 5;
                  let tot = mult * 2;


                  style.sheet.insertRule(
                    `.b-wrap {padding-top: ${(value / 5) * mult}px}`
                  );
                  style.sheet.insertRule(
                    `.b-wrap {padding-bottom: ${tot - (value / 5) * mult}px}`
                  );
                  style.sheet.insertRule(
                    `.b-wrap {padding-right: ${(value / 5) * mult}px}`
                  );
                  style.sheet.insertRule(
                    `.b-wrap {padding-left: ${tot - (value / 5) * mult}px}`
                  );
                }}
              />
            </div>
          </Wrap>
        </HomeBrick> */}
        {/* <HomeBrick>
          <Wrap n={25}>
            <input
              type="range"
              min="1"
              max="9"
              orient="vertical"
              defaultValue={5}
              step="0.1"
              style={{
                height: "100px",
                width: "100%",
                verticalAlign: "middle"
              }}
              alt="focus"
              onChange={e => {
                let value = e.target.value;
                let style = document.getElementById("slider-style");
                if (style) style.remove();
                style = document.createElement("style");
                style.id = "slider-style";
                document.head.appendChild(style);

                let mult = window.matchMedia("(max-width: 500px)").matches
                  ? 1
                  : 5;
                let tot = mult * 2;
                style.sheet.insertRule(
                  `.b-wrap {padding-right: ${(value / 5) * mult}px}`
                );
                style.sheet.insertRule(
                  `.b-wrap {padding-left: ${tot - (value / 5) * mult}px}`
                );
              }}
            />
          </Wrap>
        </HomeBrick> */}

        <HomeBrick hideOnMobile>
          <Wrap n={150} />
        </HomeBrick>
          <RandomTweets />
      </div>
    );
  }
}
