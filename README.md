# YouTube Clone

A responsive YouTube clone web application built with HTML, CSS (Tailwind), and JavaScript. This application fetches and displays videos from the YouTube Data API and presents them in a modern dashboard layout.

## Features

- Responsive dashboard layout using Tailwind CSS
- Video search functionality with debounced search suggestions
- Infinite scroll with throttled loading
- Video playback using YouTube IFrame Player
- Modern UI with loading states and animations
- Mobile-friendly design

## Prerequisites

- A Google Developer account
- YouTube Data API v3 enabled
- API key from Google Cloud Console

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd youtube-clone
```

2. Get your YouTube API key:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the YouTube Data API v3
   - Create credentials (API key)
   - Copy your API key

3. Replace the API key in `app.js`:
   - Open `app.js`
   - Find the line: `const API_KEY = 'YOUR_API_KEY';`
   - Replace 'YOUR_API_KEY' with your actual API key

4. Run the application:
   - You can use any local server to serve the files
   - For example, using Python's built-in server:
     ```bash
     python -m http.server 8000
     ```
   - Or using Node.js's `http-server`:
     ```bash
     npx http-server
     ```

5. Open your browser and navigate to:
   - If using Python: `http://localhost:8000`
   - If using http-server: `http://localhost:8080`

## Implementation Details

### YouTube API Integration

The application uses the following YouTube Data API endpoints:

1. **Popular Videos**
   - Endpoint: `/videos`
   - Parameters: `part=snippet,statistics`, `chart=mostPopular`
   - Used to fetch trending videos for the homepage

2. **Search Videos**
   - Endpoint: `/search`
   - Parameters: `part=snippet`, `type=video`
   - Used for video search functionality

3. **Video Details**
   - Endpoint: `/videos`
   - Parameters: `part=snippet,statistics`
   - Used to fetch detailed information about videos

### Search Suggestions

The application implements search suggestions using the Google Queries API:
- Endpoint: `https://suggestqueries.google.com/complete/search`
- Parameters: `client=youtube`, `ds=yt`
- Debounced to limit API calls (300ms delay)

### Performance Optimizations

1. **Debouncing**
   - Applied to search input (300ms)
   - Prevents excessive API calls while typing

2. **Throttling**
   - Applied to scroll events (250ms)
   - Optimizes infinite scroll performance

3. **Lazy Loading**
   - Videos are loaded in batches
   - Loading spinner indicates when more content is being fetched

## Browser Support

The application is compatible with modern browsers that support:
- ES6+ JavaScript features
- Fetch API
- CSS Grid
- Tailwind CSS

## License

This project is open source and available under the MIT License. 