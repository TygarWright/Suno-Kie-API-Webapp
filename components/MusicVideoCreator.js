import React, { useState } from 'react';
import api from '../utils/api';

export default function MusicVideoCreator({ apiKey }) {
  const [taskId, setTaskId] = useState('');
  const [audioId, setAudioId] = useState('');
  const [author, setAuthor] = useState('');
  const [domainName, setDomainName] = useState('');
  const [status, setStatus] = useState('');

  async function createVideo() {
    setStatus('Creating music video...');
    try {
      const res = await api.createMusicVideo(apiKey, {
        taskId,
        audioId,
        author,
        domainName,
      });
      setStatus(`Success! Task ID: ${res.data.taskId}`);
    } catch (e) {
      setStatus('Error: ' + e.message);
    }
  }

  return (
    <div>
      <h3>Create Music Video</h3>
      <input placeholder="Task ID" value={taskId} onChange={e => setTaskId(e.target.value)} />
      <input placeholder="Audio ID" value={audioId} onChange={e => setAudioId(e.target.value)} />
      <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <input placeholder="Domain Name" value={domainName} onChange={e => setDomainName(e.target.value)} />
      <button onClick={createVideo}>Create Video</button>
      <p>{status}</p>
    </div>
  );
}
