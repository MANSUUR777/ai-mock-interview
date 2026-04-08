from flask import Flask, request, jsonify
from flask_cors import CORS
from core.questions import get_random_question
from core.evaluator import evaluate_answer
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/question', methods=['POST'])
def fetch_question():
    role = request.json.get('role', 'Python')
    return jsonify({"question": get_random_question(role)})

@app.route('/api/evaluate', methods=['POST'])
def evaluate():
    answer = request.json.get('answer', '')
    return jsonify(evaluate_answer(answer))

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)