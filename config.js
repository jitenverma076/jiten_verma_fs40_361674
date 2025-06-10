// Configuration file for API keys
const config = {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || window.ENV_YOUTUBE_API_KEY || ''
};

// Debug log to check if config is loaded
if (!config.YOUTUBE_API_KEY) {
    console.warn('Warning: YouTube API key is not set. Please set the YOUTUBE_API_KEY environment variable.');
}

Object.freeze(config);

export default config; 