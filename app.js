// Import configuration
import config from './config.js';

// DOM Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const videoGrid = document.getElementById('videoGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const noResults = document.getElementById('noResults');
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const closeModal = document.getElementById('closeModal');

// API Functions
async function searchVideos(query) {
    try {
        showLoading();
        const params = new URLSearchParams({
            ...config.defaultParams,
            q: query,
            key: config.apiKey
        });

        const response = await fetch(`${config.endpoints.search}?${params}`);
        if (!response.ok) throw new Error('Failed to fetch videos');

        const data = await response.json();
        if (data.items?.length > 0) {
            renderVideos(data.items);
        } else {
            showNoResults();
        }
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Fetch trending (most popular) videos for homepage
async function fetchTrendingVideos() {
    try {
        showLoading();
        const params = new URLSearchParams({
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 20,
            regionCode: 'US',
            key: config.apiKey
        });
        const response = await fetch(`${config.endpoints.videos}?${params}`);
        if (!response.ok) throw new Error('Failed to fetch trending videos');
        const data = await response.json();
        if (data.items?.length > 0) {
            renderVideos(data.items, true); // true = trending
        } else {
            showNoResults();
        }
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// UI Functions
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    videoGrid.classList.add('hidden');
    errorMessage.classList.add('hidden');
    noResults.classList.add('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
    videoGrid.classList.remove('hidden');
}

function showError(message) {
    errorMessage.querySelector('span').textContent = message;
    errorMessage.classList.remove('hidden');
    videoGrid.classList.add('hidden');
}

function showNoResults() {
    noResults.classList.remove('hidden');
    videoGrid.classList.add('hidden');
}

function renderVideos(videos, isTrending = false) {
    videoGrid.innerHTML = videos.map(video => {
        const videoId = isTrending ? video.id : video.id.videoId;
        const snippet = video.snippet;
        return `
        <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer video-card"
             data-video-id="${videoId}">
            <div class="relative pb-[56.25%]">
                <img src="${snippet.thumbnails.high.url}" 
                     alt="${snippet.title}"
                     class="absolute inset-0 w-full h-full object-cover rounded-t-lg">
                <span class="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
                    ${snippet.liveBroadcastContent === 'live' ? 'LIVE' : ''}
                </span>
            </div>
            <div class="p-3">
                <div class="flex space-x-3">
                    <div class="flex-1">
                        <h3 class="text-base font-medium line-clamp-2">
                            ${snippet.title}
                        </h3>
                        <p class="text-sm text-gray-600 mt-1">
                            ${snippet.channelTitle}
                        </p>
                        <p class="text-sm text-gray-600">
                            ${new Date(snippet.publishedAt || snippet.publishTime).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
    // Attach click event listeners to video cards
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video-id');
            openVideoModal(videoId);
        });
    });
}

// Video Modal Functions
function openVideoModal(videoId) {
    if (!videoId) return;

    videoModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    videoPlayer.innerHTML = `
        <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="aspect-video">
        </iframe>
    `;
}

function closeVideoModal() {
    videoModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    videoPlayer.innerHTML = '';
}

// Event Listeners
searchButton?.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchVideos(query);
    }
});

searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            searchVideos(query);
        }
    }
});

closeModal?.addEventListener('click', closeVideoModal);

// Initialize with trending videos
window.addEventListener('DOMContentLoaded', () => {
    fetchTrendingVideos();
});