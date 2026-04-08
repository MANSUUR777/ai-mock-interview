import random

QUESTIONS_DB = {
    "Python": [
        "Explain the difference between a list and a tuple.",
        "What are decorators in Python and how do they work?",
        "How is memory managed in Python?",
        "What is a generator and why would you use it?"
    ],
    "Web Development": [
        "Explain the box model in CSS.",
        "What is the difference between Virtual DOM and Shadow DOM?",
        "How does the 'this' keyword work in JavaScript?",
        "What are the benefits of using TypeScript over JavaScript?"
    ],
    "AI": [
        "What is the difference between supervised and unsupervised learning?",
        "Explain the concept of Overfitting.",
        "What is a Transformer architecture in NLP?",
        "What is the role of an activation function in a neural network?"
    ],
    "Java": [
        "What is the difference between an Interface and an Abstract Class?",
        "Explain the Four Pillars of OOP.",
        "How does the Java Garbage Collector work?",
        "What is the purpose of the 'final' keyword?"
    ]
}

def get_random_question(role):
    return random.choice(QUESTIONS_DB.get(role, ["Tell me about your career goals."]))