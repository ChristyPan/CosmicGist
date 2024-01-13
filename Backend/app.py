from flask import Flask, jsonify, request
import os

app = Flask(__name__)

@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    input_text = data.get('text', '')
    
    # Implement your summarization logic here
    summarized_text = input_text.upper()

    return jsonify({'summarizedText': summarized_text})

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)


# openai.api_key = "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"

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

