
# Pinterest-Inspired Image Explorer

This project is a Pinterest-inspired web application that allows users to explore, search, and interact with images. It features a responsive masonry grid layout, image search functionality powered by the Pexels API, and an AI-powered image analysis feature using the Gemini API.

## Features

- **Masonry Grid Layout**: Displays images in a visually appealing masonry grid layout.
- **Search Functionality**: Search for images using keywords via the Pexels API.
- **Random Image Topics**: Fetch random images based on predefined topics for variety.
- **AI-Powered Image Analysis**: Analyze images to generate descriptions and eco-friendly alternatives using the Gemini API.
- **Feedback Form**: Collect user feedback with satisfaction ratings and suggestions.
- **Responsive Design**: Fully responsive layout for desktop and mobile devices.
- **Image Modal**: View images in a modal with detailed descriptions and eco-friendly suggestions.

## Project Structure

```
.
├── index.html         # Main HTML file
├── styles.css         # CSS for styling the application
├── script.js          # JavaScript for frontend functionality
├── try_gemini.py      # Flask backend for AI-powered image analysis
├── assets/            # Folder containing SVG icons
│   ├── account.svg
│   ├── arrowhead.svg
│   ├── mdi_pinterest.svg
│   ├── message.svg
│   ├── notification.svg
│   ├── search.svg
```

## Setup Instructions

### Prerequisites

- [Python 3](https://www.python.org/) (for running the Flask backend)
- API keys for:
  - [Pexels API](https://www.pexels.com/api/)
  - [EmailJS](https://www.emailjs.com/)
  - [Gemini API](https://cloud.google.com/ai/gemini)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/pinterest-inspired.git
   cd pinterest-inspired
   ```

2. Replace placeholders in `script.js`:
   - Replace `YOUR_PEXELS_API_KEY` with your Pexels API key.
   - Replace `YOUR_EMIALJS_INIT_KEY`, `SERVICE_ID_OF_EMAIL_JS`, and `TEMPLATE_ID_OF_EMAIL_JS` with your EmailJS credentials.

3. Open `index.html` in your browser to view the application.

### Backend Setup

1. Install Python dependencies:
   ```bash
   pip install flask flask-cors requests
   ```

2. Replace `YOUR_GEMINI_KEY` in `try_gemini.py` with your Gemini API key.

3. Run the Flask server:
   ```bash
   python try_gemini.py
   ```

4. The backend will be available at `http://127.0.0.1:5000`.

### Running the Application

1. Open `index.html` in your browser.
2. Interact with the application:
   - Use the search bar to find images.
   - Click on images to view details in the modal.
   - Submit feedback using the form at the bottom of the page.

## Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript
  - EmailJS for sending feedback emails
  - Pexels API for image search
- **Backend**:
  - Flask for serving the AI-powered image analysis
  - Gemini API for generating image descriptions and eco-friendly alternatives
- **Styling**:
  - Responsive design with CSS media queries
  - Custom fonts from Google Fonts


## Future Enhancements

- Add user authentication for personalized experiences.
- Implement infinite scrolling for the masonry grid.
- Enhance AI analysis with additional prompts and features.
- Add support for uploading user images for analysis.


## Acknowledgments

- [Pexels](https://www.pexels.com/) for providing free image APIs.
- [EmailJS](https://www.emailjs.com/) for enabling email functionality.
- [Google Gemini API](https://cloud.google.com/ai/gemini) for AI-powered image analysis.
```

