import "../pages/example.less";
import "../styles/roll.css";

import { withPrefix } from "gatsby-link";
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import tweetsData from "../data/filtered_tweets";

// Utility function to extract filename from URL
const getFilename = (url) => {
  return url.split('/').pop();
};

// Function to convert plain text URLs to clickable links
const linkifyText = (text) => {
  if (!text) return "";
  // URL regex pattern
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    // If this part matches the URL pattern, make it a link
    if (part.match(urlRegex)) {
      return (
        <a 
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    }
    // Otherwise just return the text
    return part;
  });
};

// Component for rendering media (images or videos)
const MediaItem = ({ id_str, media }) => {
  const isVideo = media.type === "video" || media.type === "animated_gif";
  const mediaFilename = getFilename(media.media_url || media.media_url_https);
  const assetPath = `/good_assets/${id_str}-${mediaFilename}`;
  const [isMuted, setIsMuted] = useState(true);
  
  // Get the best video source from video_info if available
  const getVideoSource = () => {
    // If we have video_info with variants, use the highest quality mp4
    if (media.video_info && media.video_info.variants) {
      // Filter for mp4 sources
      const mp4Variants = media.video_info.variants.filter(
        variant => variant.content_type === "video/mp4"
      );
      
      // Sort by bitrate (highest first)
      const sortedVariants = mp4Variants.sort(
        (a, b) => (b.bitrate || 0) - (a.bitrate || 0)
      );
      
      // Return the URL of the best quality variant, or fall back to local asset
      if (sortedVariants.length > 0) {
        return sortedVariants[0].url;
      }
    }
    
    // Fall back to local asset if no video_info or no valid variants
    return withPrefix(assetPath);
  };

  const handleVideoClick = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <div className="media-item">
      {isVideo ? (
        <video 
          controls
          autoPlay={true}
          muted={isMuted}
          loop={media.type === "animated_gif"}
          src={getVideoSource()}
          className="media-content"
          poster={withPrefix(assetPath)}
          onClick={handleVideoClick}
        />
      ) : (
        <img 
          src={withPrefix(assetPath)}
          alt=""
          className="media-content"
          loading="lazy"
        />
      )}
    </div>
  );
};

// Post Component
const Post = ({ post }) => {
  const { id_str, full_text, created_at } = post.tweet;
  const hasMedia = post.tweet.extended_entities && post.tweet.extended_entities.media;
  const date = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });

  // Skip rendering if there's no text and no media
  if (!full_text && !hasMedia) return null;

  return (
    <div className="post">
      <div className="post-date">{date}</div>
      
      {full_text  && full_text.trim().length > 0 && <div className="post-text">{linkifyText(full_text)}</div>}
      
      {hasMedia && (
        <div className="media-container">
          {post.tweet.extended_entities.media.map((media, index) => (
            <MediaItem 
              key={index}
              id_str={id_str} 
              media={media}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Page Component
const RollPage = () => {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    // Sort the tweets data by created_at date (newest first)
    const sortedPosts = [...tweetsData].sort((a, b) => {
      return new Date(b.tweet.created_at) - new Date(a.tweet.created_at);
    });
    
    // Set the sorted posts data
    setPosts(sortedPosts);
    
    // Add scroll listener for infinite scroll
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 500
      ) {
        setVisibleCount(prev => prev + 10);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="roll-container">
      <Helmet title="Roll | Max Bittker" />
      
      <div className="roll-content">
        {posts.slice(0, visibleCount).map((post, index) => (
          <Post key={index} post={post} />
        ))}
        
        {visibleCount < posts.length && (
          <div className="load-more">Loading more...</div>
        )}
      </div>
    </div>
  );
};

export default RollPage; 