#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to the original tweets data file
const TWEETS_PATH = path.resolve(__dirname, 'src/data/good_tweets.js');
// Path for the output file
const OUTPUT_PATH = path.resolve(__dirname, 'src/data/filtered_tweets.js');

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(outputDir)) {
  console.log(`Creating directory: ${outputDir}`);
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to extract only the fields we need from each tweet
function filterTweetData(tweets) {
  return tweets.map(item => {
    const { tweet } = item;
    
    // Create a simplified tweet object with only the fields we use
    const filteredTweet = {
      id_str: tweet.id_str,
      full_text: tweet.full_text,
      created_at: tweet.created_at
    };
    
    // Handle media if it exists
    if (tweet.extended_entities && tweet.extended_entities.media) {
      filteredTweet.extended_entities = {
        media: tweet.extended_entities.media.map(media => {
          const filteredMedia = {
            type: media.type,
            media_url: media.media_url,
            media_url_https: media.media_url_https
          };
          
          // Add video-specific data if this is a video or animated_gif
          if (media.type === 'video' || media.type === 'animated_gif') {
            if (media.video_info) {
              filteredMedia.video_info = media.video_info;
            }
            if (media.additional_media_info) {
              filteredMedia.additional_media_info = media.additional_media_info;
            }
          }
          
          return filteredMedia;
        })
      };
    }
    
    return { tweet: filteredTweet };
  });
}

// Read the original tweets file
console.log('Reading tweets data...');
// We need to read the file as text first
const fileContent = fs.readFileSync(TWEETS_PATH, 'utf8');

// Extract the actual JSON data by removing the export default part
const jsonContent = fileContent.replace('export default ', '');

// Parse the tweets data
let tweetsData;
try {
  tweetsData = eval(jsonContent); // Using eval since it's a JS export, not pure JSON
} catch (error) {
  console.error('Error parsing tweets data:', error);
  process.exit(1);
}

// Filter the tweets data
console.log('Filtering tweets data...');
const filteredTweets = filterTweetData(tweetsData);

// Write the filtered data to the output file
console.log(`Writing filtered data to ${OUTPUT_PATH}...`);
fs.writeFileSync(
  OUTPUT_PATH, 
  `export default ${JSON.stringify(filteredTweets, null, 2)}`
);

console.log('Done! Successfully created filtered tweets data with only the necessary fields.');
console.log(`Original file size: ${(fileContent.length / 1024 / 1024).toFixed(2)} MB`);
console.log(`Filtered file size: ${(fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(2)} MB`); 