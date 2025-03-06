emailjs.init("PUBLIC_ID");
// Function to get random topics for variety
function getRandomTopics() {
    const topics = ['nature', 'architecture', 'travel', 'technology', 'cars', 'cyberpunk', 
                    'minimalist', 'cityscape', 'dark', 'superhero', 'vintage', 'poster', 'art'];
    const shuffled = [...topics].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).join(',');
}

// Function to fetch images from Pexels API based on search query
async function fetchImages(page = 1, isFallback = false) {
    const spinner = document.getElementById('spinner');
    if (!isFallback) {
        spinner.style.display = 'flex';
    }
    
    try {
        const apiKey = 'PEXELS_API_KEY';
        const perPage = 20;
        const topics = getRandomTopics();
        
        const response = await fetch(`https://api.pexels.com/v1/search?query=${topics}&per_page=${perPage}&page=${page}`, {
            headers: {
                'Authorization': apiKey
            }
        });
        
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error('Error fetching images:', error);
        return generatePlaceholderImages();
    } finally {
        if (!isFallback) {
            spinner.style.display = 'none';
        }
    }
}

// Function to generate placeholder images if API fails
function generatePlaceholderImages() {
    const placeholders = [];
    const aspectRatios = [
        {width: 400, height: 600},   // Portrait
        {width: 600, height: 400},   // Landscape
        {width: 500, height: 500},   // Square
        {width: 400, height: 800},   // Tall
        {width: 800, height: 400}    // Wide
    ];
    
    for (let i = 1; i <= 20; i++) {
        const ratio = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        
        placeholders.push({
            id: i,
            src: {
                original: `https://via.placeholder.com/${ratio.width}x${ratio.height}/${randomColor}/FFFFFF`,
                medium: `https://via.placeholder.com/${ratio.width}x${ratio.height}/${randomColor}/FFFFFF`
            },
            height: ratio.height,
            width: ratio.width
        });
    }
    return placeholders;
}

// Function to create and append image items to the grid
function renderImages(images) {
    const masonryGrid = document.getElementById('masonryGrid');
    
    images.forEach(image => {
        const masonryItem = document.createElement('div');
        masonryItem.className = 'masonry-item';
        
        const img = document.createElement('img');
        img.src = image.src?.original || image;
        img.alt = 'Explore image';
        img.loading = 'lazy';
        
        masonryItem.appendChild(img);
        masonryGrid.appendChild(masonryItem);
    });
}

// Variable to track current page
let currentPage = 1;

// Load more images when button is clicked
function setupLoadMoreButton() {
    document.getElementById('loadMoreBtn').addEventListener('click', async () => {
        if (isSearchActive) {
            // If in search mode, load more search results
            currentSearchPage++;
            await searchImages(currentSearchQuery, currentSearchPage);
        } else {
            // Otherwise, use the original random topics logic
            currentPage++;
            const moreImages = await fetchImages(currentPage);
            renderImages(moreImages);
        }
    });
}

// Initialize the page
async function initPage() {
    const images = await fetchImages();
    renderImages(images);
    setupLoadMoreButton();
    
    // Run the simulation for immediate preview
    simulatePexelsAPI();
}

// Ensure the CSS file is linked in your HTML file
// <link rel="stylesheet" href="style.css">

// Simulate Pexels API with predefined images for immediate display
function simulatePexelsAPI() {
    const masonryGrid = document.getElementById('masonryGrid');
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
    
    // Sample diverse images similar to the example
    const sampleImages = [
        {url: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg', ratio: 'tall'},
        {url: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg', ratio: 'landscape'},
        {url: 'https://images.pexels.com/photos/3573351/pexels-photo-3573351.png', ratio: 'square'},
        {url: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg', ratio: 'tall'},
        {url: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg', ratio: 'landscape'},
        {url: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg', ratio: 'tall'},
        {url: 'https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg', ratio: 'square'},
        {url: 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg', ratio: 'landscape'},
        {url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg', ratio: 'tall'},
        {url: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg', ratio: 'square'},
        {url: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg', ratio: 'landscape'},
        {url: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg', ratio: 'tall'}
    ];
    
    sampleImages.forEach(image => {
        const masonryItem = document.createElement('div');
        masonryItem.className = 'masonry-item';
        
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = 'Explore image';
        img.loading = 'lazy';
        
        masonryItem.appendChild(img);
        masonryGrid.appendChild(masonryItem);
    });
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);

const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",  
  day: "2-digit"  
});  

document.getElementById("date").textContent = formattedDate;

function sendEmail() {
    const serviceID = "SERVICE_ID";
    const templateID = "Template_ID";

    const satisfaction = document.querySelector('input[name="satisfaction"]:checked');
    const feedbackComment = document.getElementById("feedbackComment").value.trim();
    const userEmail = document.getElementById("userEmail").value.trim();
    const contactConsent = document.getElementById("contactConsent").checked ? "Yes" : "No";

    // **Form Validation**
    if (!satisfaction) {
        alert("Please select your satisfaction level.");
        return;
    }
    if (feedbackComment === "") {
        alert("Please enter your suggestions for improvement.");
        return;
    }
    if (userEmail === "") {
        alert("Please enter your email.");
        return;
    }
    if (!validateEmail(userEmail)) {
        alert("Please enter a valid email address.");
        return;
    }

    // **Send Email using EmailJS**
    emailjs.send(serviceID, templateID, {
        satisfaction: satisfaction.value,
        feedbackComment: feedbackComment,
        userEmail: userEmail,
        contactConsent: contactConsent
    }).then(response => {
        document.getElementById("feedbackThankYou").style.display = "block";
        document.getElementById("feedbackForm").reset();
    }).catch(error => {
        alert("Failed to send feedback. Try again later.");
        console.error("EmailJS Error:", error);
    });
}

// **Helper Function: Validate Email Format**
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

// Get the search input element from the navbar
const searchInput = document.querySelector('.navbar input[type="search"]');
let currentSearchPage = 1;
let currentSearchQuery = '';
let isSearchActive = false;

// Add event listener for the search input
searchInput.addEventListener('keypress', function(event) {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        event.preventDefault();
        
        const query = searchInput.value.trim();
        
        if (query === '') {
            // If search is empty, reset to initial random images
            isSearchActive = false;
            document.getElementById('masonryGrid').innerHTML = '';
            currentPage = 1;
            initPage();
            return;
        }
        
        // Set search as active
        isSearchActive = true;
        currentSearchQuery = query;
        currentSearchPage = 1;
        
        // Clear existing grid and search for new images
        document.getElementById('masonryGrid').innerHTML = '';
        searchImages(query, currentSearchPage);
    }
});

// Function to search images from Pexels API
async function searchImages(query, page = 1) {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'flex';
    
    try {
        const apiKey = 'V8EJNn6TgYQ4h5hzM2Zg9hOW9TcguBd62nGGlYzIBX4UQuYX0bDgRJVl';
        const perPage = 20;
        
        // Use the search query provided by the user
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`, {
            headers: {
                'Authorization': apiKey
            }
        });
        
        const data = await response.json();
        
        if (data.photos && data.photos.length > 0) {
            renderImages(data.photos);
        } else {
            // If no results, show a message
            const masonryGrid = document.getElementById('masonryGrid');
            masonryGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; color: white; padding: 40px;">
                    <h3>No images found for "${query}"</h3>
                    <p>Try a different search term or explore our featured images below.</p>
                </div>
            `;
            // Load some random images as fallback
            fetchImages(1, true).then(photos => {
                if (photos && photos.length > 0) {
                    renderImages(photos);
                }
            });
        }
    } catch (error) {
        console.error('Error searching images:', error);
        // Use placeholder images if API fails
        renderImages(generatePlaceholderImages());
    } finally {
        spinner.style.display = 'none';
    }
}



// Add a visual indicator when search is active
searchInput.addEventListener('focus', function() {
    this.style.width = '80%';
});

searchInput.addEventListener('blur', function() {
    if (this.value.trim() === '') {
        this.style.width = '70%';
    }
});

