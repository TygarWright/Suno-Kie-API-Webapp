import React, { useState } from 'react';
import api from '../utils/api';

const models = ['V3_5', 'V4'];
const vocalGenders = ['m', 'f'];
const yesNoOptions = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export default function MusicGenerator({ apiKey }) {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Classical');
  const [model, setModel] = useState(models[0]);
  const [vocalGender, setVocalGender] = useState(vocalGenders[0]);
  const [instrumental, setInstrumental] = useState(true);
  const [customMode, setCustomMode] = useState(true);
  const [styleWeight, setStyleWeight] = useState(0.65);
  const [weirdnessConstraint, setWeirdnessConstraint] = useState(0.65);
  const [audioWeight, setAudioWeight] = useState(0.65);
  const [negativeTags, setNegativeTags] = useState('');
  const [status, setStatus] = useState('');

  async function generate() {
    setStatus('Generating music...');
    try {
      const payload = {
        title,
        prompt,
        style,
        model,
        vocalGender,
        instrumental,
        customMode,
        styleWeight: Number(styleWeight),
        weirdnessConstraint: Number(weirdnessConstraint),
        audioWeight: Number(audioWeight),
        negativeTags,
      };
      const res = await api.generateMusic(apiKey, payload);
      setStatus(`Success! Task ID: ${res.data.taskId}`);
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
  }

  return (
    <div>
      <h3>Generate Music</h3>
      <input
        type="text"
        placeholder="Title (max 80 chars)"
        value={title}
        maxLength={80}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Prompt (describe theme, style, mood)"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows={4}
      />
      <input
        type="text"
        placeholder="Style"
        value={style}
        onChange={e => setStyle(e.target.value)}
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
      <label>Instrumental:</label>
      <select value={instrumental} onChange={e => setInstrumental(e.target.value === 'true')}>
        {yesNoOptions.map(opt => (
          <option key={opt.label} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <label>Custom Mode:</label>
      <select value={customMode} onChange={e => setCustomMode(e.target.value === 'true')}>
        {yesNoOptions.map(opt => (
          <option key={opt.label} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <label>Style Weight (0-1):</label>
      <input
        type="number"
        step="0.01"
        min="0"
        max="1"
        value={styleWeight}
        onChange={e => setStyleWeight(e.target.value)}
      />
      <label>Weirdness Constraint (0-1):</label>
      <input
        type="number"
        step="0.01"
        min="0"
        max="1"
        value={weirdnessConstraint}
        onChange={e => setWeirdnessConstraint(e.target.value)}
      />
      <label>Audio Weight (0-1):</label>
      <input
        type="number"
        step="0.01"
        min="0"
        max="1"
        value={audioWeight}
        onChange={e => setAudioWeight(e.target.value)}
      />
      <textarea
        placeholder="Negative Tags (comma separated)"
        value={negativeTags}
        onChange={e => setNegativeTags(e.target.value)}
        rows={2}
      />
      <br />
      <button onClick={generate}>Generate</button>
      <p>{status}</p>
    </div>
  );
}
