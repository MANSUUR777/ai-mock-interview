import { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export const useInterview = () => {
  const [role, setRole] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [qCount, setQCount] = useState(1);

  const fetchQuestion = async (selectedRole) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/question`, { role: selectedRole });
      setQuestion(res.data.question);
      setRole(selectedRole);
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async (answer) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/evaluate`, { answer });
      setResult(res.data);
    } finally {
      setLoading(false);
    }
  };

  return { role, question, loading, result, qCount, setQCount, fetchQuestion, evaluateAnswer, setResult };
};
