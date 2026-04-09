from flask import Flask, request, jsonify
from flask_cors import CORS
from core.questions import get_random_question
from core.evaluator import evaluate_answer
import os

app = Flask(__name__)

# ✅ IMPROVED CORS: Allows your Vercel site to talk to this Render server
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ✅ NEW: Health check route
# You can open this in your browser to see if the server is actually alive
@app.route('/')
def home():
    return jsonify({"status": "online", "message": "AI Mock Interview API is running"})

@app.route('/api/question', methods=['POST'])
def fetch_question():
    try:
        data = request.get_json()
        role = data.get('role', 'Python')
        question = get_random_question(role)
        return jsonify({"question": question})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/evaluate', methods=['POST'])
def evaluate():
    try:
        data = request.get_json()
        answer = data.get('answer', '')
        result = evaluate_answer(answer)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Render provides the PORT environment variable automatically
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
