import React, { useState } from 'react';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAINews = async () => {
    setLoading(true);
    setError('');
    setNews([]);
    try {
      const res = await fetch('http://localhost:5000/api/ai-news');
      if (!res.ok) throw new Error('Failed to fetch news');
      const data = await res.json();
      setNews(data.news || []);
    } catch (err) {
      setError('Could not fetch AI news.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1>AI News of the Week</h1>
      <button onClick={getAINews} style={{ padding: '12px 24px', fontSize: 18, cursor: 'pointer' }} disabled={loading}>
        {loading ? 'Loading...' : 'Get AI News'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      <ul style={{ marginTop: 32 }}>
        {news.map((item, idx) => (
          <li key={idx} style={{ marginBottom: 20 }}>
            <strong>{item.title}</strong><br />
            <span>{item.summary}</span><br />
            <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
