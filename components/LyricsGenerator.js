import React, { useState } from 'react';
import api from '../utils/api';

export default function LyricsGenerator({ apiKey }) {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('');
  const [lyrics, setLyrics] = useState('');

  async function generateLyrics() {
    setStatus('Generating lyrics...');
    setLyrics('');
    try {
      const res = await api.generateLyrics(apiKey, { prompt });
      setLyrics(res.data.lyrics || 'Lyrics generated.');
      setStatus('Success!');
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
  }

  return (
    <div>
      <h3>Generate Lyrics</h3>
      <textarea
        placeholder="Enter lyrics prompt"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows={5}
      />
      <button onClick={generateLyrics} disabled={!prompt.trim()}>
        Generate
      </button>
      <p>{status}</p>
      {lyrics && (
        <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#222', padding: '1rem', borderRadius: '8px' }}>
          {lyrics}
        </pre>
      )}
    </div>
  );
}
