import React, { useState } from 'react';
import api from '../utils/api';

export default function VocalInstrumentalManager({ apiKey }) {
  const [audioId, setAudioId] = useState('');
  const [status, setStatus] = useState('');

  async function addInstrumental() {
    setStatus('Adding instrumental...');
    try {
      await api.addInstrumental(apiKey, { audioId });
      setStatus('Instrumental added successfully!');
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
  }

  async function addVocals() {
    setStatus('Adding vocals...');
    try {
      await api.addVocals(apiKey, { audioId });
      setStatus('Vocals added successfully!');
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
  }

  async function separateVocals() {
    setStatus('Separating vocals...');
    try {
      await api.separateVocals(apiKey, { audioId });
      setStatus('Vocals separated successfully!');
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
  }

  return (
    <div>
      <h3>Manage Vocals & Instrumentals</h3>
      <input placeholder="Audio ID" value={audioId} onChange={e => setAudioId(e.target.value)} />
      <button onClick={addInstrumental}>Add Instrumental</button>
      <button onClick={addVocals}>Add Vocals</button>
      <button onClick={separateVocals}>Separate Vocals</button>
      <p>{status}</p>
    </div>
  );
}
