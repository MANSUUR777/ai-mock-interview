def evaluate_answer(answer):
    text = answer.strip()
    word_count = len(text.split())
    
    # Logic: Base score on depth + keyword density
    score = 40 if word_count > 5 else 20
    score += min(word_count * 2, 40)
    
    # Keyword bonus
    keywords = ["example", "system", "process", "memory", "data", "efficient"]
    bonus = sum(5 for word in keywords if word in text.lower())
    score = min(score + bonus, 98)

    if word_count < 10:
        feedback = "Your answer is quite brief. Try to explain the 'why' and provide an example."
    elif bonus < 5:
        feedback = "Good explanation, but try to use more technical terminology."
    else:
        feedback = "Excellent! You demonstrated a deep understanding of the topic."

    return {"score": int(score), "feedback": feedback}