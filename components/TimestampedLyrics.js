import React, { useState } from 'react';
import api from '../utils/api';

export default function TimestampedLyrics({ apiKey }) {
  const [audioId, setAudioId] = useState('');
  const [status, setStatus] = useState('');
  const [lyrics, setLyrics] = useState('');

  async function fetchTimestampedLyrics() {
    setStatus('Fetching timestamped lyrics...');
    try {
      const res = await api.getTimestampedLyrics(apiKey, { audioId });
      setLyrics(JSON.stringify(res.data, null, 2));
      setStatus('Fetched lyrics successfully!');
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
  }

  return (
    <div>
      <h3>Get Timestamped Lyrics</h3>
      <input placeholder="Audio ID" value={audioId} onChange={e => setAudioId(e.target.value)} />
      <button onClick={fetchTimestampedLyrics}>Fetch</button>
      <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#222', padding: '1rem', borderRadius: '8px', maxHeight: '300px', overflow: 'auto' }}>
        {lyrics}
      </pre>
      <p>{status}</p>
    </div>
  );
}
