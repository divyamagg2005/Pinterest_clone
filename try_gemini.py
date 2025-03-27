from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests
import base64

app = Flask(__name__)
CORS(app)  # Allow all origins

def encode_image_from_url(image_url):
    """Fetch image from URL and encode it in base64"""
    response = requests.get(image_url)
    if response.status_code == 200:
        return base64.b64encode(response.content).decode('utf-8')
    else:
        return None

def analyze_image(image_url, prompt):
    """Send image to Gemini API and get response"""
    api_key = "YOUR_GEMINI_KEY"
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    encoded_image = encode_image_from_url(image_url)
    if not encoded_image:
        return "Error: Failed to fetch image."

    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{
            "parts": [{
                "inline_data": {
                    "mime_type": "image/jpeg",
                    "data": encoded_image
                }
            }, {
                "text": prompt
            }]
        }]
    }

    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        try:
            return response.json()["candidates"][0]["content"]["parts"][0]["text"]
        except KeyError:
            return "Error: Unexpected response format."
    else:
        return f"Error: {response.status_code}, {response.text}"

@app.route('/analyze', methods=['POST'])
def analyze():
    """Handle frontend requests for image analysis"""
    data = request.json
    image_url = data.get("image_url")

    if not image_url:
        return jsonify({"error": "No image URL provided"}), 400

    print(f"Processing image: {image_url}")

    description = analyze_image(image_url, "Describe this image in detail.")
    eco_friendly_alternatives = analyze_image(image_url, "Suggest eco-friendly alternatives.")

    print(f"Description: {description}")
    print(f"Eco-Friendly Alternatives: {eco_friendly_alternatives}")

    return jsonify({
        "description": description,
        "eco_friendly_alternatives": eco_friendly_alternatives
    })

if __name__ == "__main__":
    app.run(debug=True)
