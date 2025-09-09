import React, { useState } from 'react';
import api from '../utils/api';

const models = ['V3_5', 'V4'];
const vocalGenders = ['m', 'f'];

export default function MusicExtender({ apiKey }) {
  const [audioId, setAudioId] = useState('');
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Classical');
  const [continueAt, setContinueAt] = useState('');
  const [model, setModel] = useState(models[0]);
  const [vocalGender, setVocalGender] = useState(vocalGenders[0]);
  const [status, setStatus] = useState('');

  async function extendMusic() {
    setStatus('Extending music...');
    try {
      const payload = {
        defaultParamFlag: true,
        audioId,
        title,
        prompt,
        style,
        continueAt: Number(continueAt),
        model,
        vocalGender,
        styleWeight: 0.65,
        weirdnessConstraint: 0.65,
        audioWeight: 0.65,
      };
      const res = await api.extendMusic(apiKey, payload);
      setStatus(`Success! Task ID: ${res.data.taskId}`);
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  }

  return (
    <div>
      <h3>Extend Music</h3>
      <input placeholder="Audio ID" value={audioId} onChange={e => setAudioId(e.target.value)} />
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Prompt" value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} />
      <input placeholder="Style" value={style} onChange={e => setStyle(e.target.value)} />
      <input
        type="number"
        placeholder="Continue At (seconds)"
        value={continueAt}
        onChange={e => setContinueAt(e.target.value)}
        min={0}
      />
      <label>Model:</label>
      <select value={model} onChange={e => setModel(e.target.value)}>
        {models.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <label>Vocal Gender:</label>
      <select value={vocalGender} onChange={e => setVocalGender(e.target.value)}>
        {vocalGenders.map(g => (
          <option key={g} value={g}>{g === 'm' ? 'Male' : 'Female'}</option>
        ))}
      </select>
      <button onClick={extendMusic}>Extend</button>
      <p>{status}</p>
    </div>
  );
}
