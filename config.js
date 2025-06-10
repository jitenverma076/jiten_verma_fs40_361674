// Configuration file for API keys
const config = {
    YOUTUBE_API_KEY: 'AIzaSyDEAOo1SpxKOZmZqALp9tAJdbVGjgq-3nA'
};

// Debug log to check if config is loaded
if (!config.YOUTUBE_API_KEY) {
    console.warn('Warning: YouTube API key is not set. Please set the YOUTUBE_API_KEY environment variable.');
}

Object.freeze(config);

export default config; 