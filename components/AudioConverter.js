import React, { useState } from 'react';
import api from '../utils/api';

export default function AudioConverter({ apiKey }) {
  const [audioId, setAudioId] = useState('');
  const [status, setStatus] = useState('');

  async function convertToWav() {
    setStatus('Converting audio to WAV...');
    try {
      await api.convertToWav(apiKey, { audioId });
      setStatus('Conversion completed successfully!');
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
  }

  return (
    <div>
      <h3>Convert Audio To WAV</h3>
      <input placeholder="Audio ID" value={audioId} onChange={e => setAudioId(e.target.value)} />
      <button onClick={convertToWav}>Convert</button>
      <p>{status}</p>
    </div>
  );
}
