from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
import os

app = Flask(__name__)

def extract_text_from_url(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        
        # Fetch the HTML content of the website
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for bad requests

        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract text from HTML
        text = ' '.join([p.get_text() for p in soup.find_all('p')])

        return text
    except Exception as e:
        return str(e)

@app.route('/api/summarize', methods=['POST'])
def summarize():
    try:
        url = request.json.get('url')

        summarized_text = extract_text_from_url(url)

        return jsonify({'summarizedText': summarized_text})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)


# def get_recipe_suggestions(user_message):
#     # Create a conversation with the system message as a cooking assistant and the user message
#     conversation = [
#         {"role": "system", "content": "You are a cooking assistant."},
#         {"role": "user", "content": user_message},
#     ]

#     # Generate a response from the assistant
#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=conversation
#     )

#     # Extract and return the assistant's reply
#     assistant_reply = response['choices'][0]['message']['content']
#     return assistant_reply

