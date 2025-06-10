// Configuration file for API keys
const config = {
    apiKey: 'AIzaSyDEAOo1SpxKOZmZqALp9tAJdbVGjgq-3nA',
    defaultParams: {
        part: 'snippet',
        type: 'video',
        maxResults: 20
    },
    endpoints: {
        search: 'https://www.googleapis.com/youtube/v3/search',
        videos: 'https://www.googleapis.com/youtube/v3/videos'
    }
};

// Debug log to check if config is loaded
if (!config.apiKey) {
    console.warn('Warning: YouTube API key is not set. Please set the apiKey property in config.js.');
}

Object.freeze(config);

export default config;