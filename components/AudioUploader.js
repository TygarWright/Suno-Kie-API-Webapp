import React, { useState } from 'react';
import api from '../utils/api';

const models = ['V3_5', 'V4'];
const vocalGenders = ['m', 'f'];

export default function AudioUploader({ apiKey }) {
  const [uploadUrl, setUploadUrl] = useState('');
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [model, setModel] = useState(models[0]);
  const [vocalGender, setVocalGender] = useState(vocalGenders[0]);
  const [instrumental, setInstrumental] = useState(true);
  const [status, setStatus] = useState('');

  async function uploadCover() {
    setStatus('Uploading and covering audio...');
    try {
      const payload = {
        uploadUrl,
        title,
        prompt,
        style,
        customMode: true,
        instrumental,
        model,
        vocalGender,
        styleWeight: 0.65,
        weirdnessConstraint: 0.65,
        audioWeight: 0.65,
      };
      const res = await api.uploadAndCoverAudio(apiKey, payload);
      setStatus(`Success! Task ID: ${res.data.taskId}`);
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
  }

  return (
    <div>
      <h3>Upload and Cover Audio</h3>
      <input placeholder="Upload URL" value={uploadUrl} onChange={e => setUploadUrl(e.target.value)} />
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Prompt" value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} />
      <input placeholder="Style" value={style} onChange={e => setStyle(e.target.value)} />
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
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <button onClick={uploadCover}>Upload & Cover</button>
      <p>{status}</p>
    </div>
  );
}
