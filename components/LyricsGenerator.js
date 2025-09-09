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
      if (res.lyrics) {
        setLyrics(res.lyrics);
        setStatus('Lyrics generated successfully!');
      } else {
        setStatus('Failed to generate lyrics');
      }
    } catch (e) {
      setStatus('Error: ' + (e.message || 'Unknown error'));
    }
  }

  return (
    <div style={{ marginTop: '2rem', color: '#fff' }}>
      <label htmlFor="lyricsPrompt">Prompt for lyrics generation:</label>
      <input
        id="lyricsPrompt"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., love ballad about summer"
        style={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: '8px',
          margin: '0.5rem 0',
          border: 'none',
          outline: 'none',
          fontSize: '1rem',
        }}
      />
      <button
        onClick={generateLyrics}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          cursor: 'pointer',
          backgroundColor: '#3b82f6',
          color: '#fff',
          border: 'none',
          fontWeight: 'bold',
        }}
        disabled={!prompt.trim()}
      >
        Generate Lyrics
      </button>
      <p style={{ marginTop: '1rem', minHeight: '1.5rem' }}>{status}</p>
      {lyrics && (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            maxHeight: '300px',
            overflowY: 'auto',
            fontFamily: 'monospace',
          }}
        >
          {lyrics}
        </pre>
      )}
    </div>
  );
}
