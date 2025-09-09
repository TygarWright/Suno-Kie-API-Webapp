import React, { useState } from 'react';
import api from '../utils/api';

export default function MusicGenerator({ apiKey }) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('ambient');
  const [status, setStatus] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);

  async function generateMusic() {
    setStatus('Generating music...');
    setAudioSrc(null);
    try {
      const res = await api.generateMusic(apiKey, { prompt, style });
      if (res.audioUrl) {
        setAudioSrc(res.audioUrl);
        setStatus('Music generated successfully!');
      } else {
        setStatus('Failed to generate music');
      }
    } catch (e) {
      setStatus('Error: ' + (e.message || 'Unknown error'));
    }
  }

  return (
    <div style={{ marginTop: '2rem', color: '#fff' }}>
      <label htmlFor="prompt">Prompt for music generation:</label>
      <input
        id="prompt"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., calming ambient music"
        style={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: '8px',
          margin: '0.5rem 0',
          border: 'none',
          outline: 'none',
          fontSize: '1rem'
        }}
      />
      <label htmlFor="style">Style:</label>
      <select
        id="style"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        style={{ padding: '0.5rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '1rem' }}
      >
        <option value="ambient">Ambient</option>
        <option value="pop">Pop</option>
        <option value="hiphop">Hip Hop</option>
      </select>
      <button
        onClick={generateMusic}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          cursor: 'pointer',
          backgroundColor: '#3b82f6',
          color: '#fff',
          border: 'none',
          fontWeight: 'bold'
        }}
        disabled={!prompt.trim()}
      >
        Generate
      </button>
      <p style={{ marginTop: '1rem', minHeight: '1.5rem' }}>{status}</p>
      {audioSrc && (
        <audio src={audioSrc} controls autoPlay style={{ marginTop: '1rem', width: '100%' }} />
      )}
    </div>
  );
}
