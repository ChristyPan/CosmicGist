from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
import os
import re
from dotenv import load_dotenv

# Load OpenAI API key from environment variable or use an empty string
os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY', "")
OPENAI_API_KEY = os.environ['OPENAI_API_KEY']

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

app = Flask(__name__)

def extract_text_from_url(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        
        # Fetch the HTML content of the website
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for bad requests

        if response.status_code == 200:
            # Parse the HTML content
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract text from HTML
            paragraphs = soup.find_all('p')
            text = ' '.join([p.get_text() for p in paragraphs])
        else:
            text = 'Failed to retrieve website'

        return text
    except requests.RequestException as e:
        return f"Error fetching website content: {str(e)}"
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}"

def get_text_summarization(user_message):
    conversation = [
        {"role": "system", "content": "Summarize this text from a website in bullet form"},
        {"role": "user", "content": user_message},
    ]

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=conversation,
        )
        assistant_reply = response.choices[0].message.content
        return assistant_reply
    except Exception as e:
        return f"Error in OpenAI API call: {str(e)}"

@app.route('/api/summarize', methods=['POST'])
def summarize():
    try:
        url = request.json.get('url')

        if not url:
            return jsonify({'error': 'URL is required'}), 400

        extracted_text = extract_text_from_url(url)
        summarized_text = get_text_summarization(extracted_text)

        return jsonify({'summarizedText': summarized_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)
