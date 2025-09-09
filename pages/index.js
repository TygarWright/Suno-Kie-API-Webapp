import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import APIKeyModal from '../components/APIKeyModal';
import MusicGenerator from '../components/MusicGenerator';
import LyricsGenerator from '../components/LyricsGenerator';
import MusicExtender from '../components/MusicExtender';
import MusicVideoCreator from '../components/MusicVideoCreator';
import AudioUploader from '../components/AudioUploader';
import VocalInstrumentalManager from '../components/VocalInstrumentalManager';
import AudioConverter from '../components/AudioConverter';
import TimestampedLyrics from '../components/TimestampedLyrics';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState('music');

  useEffect(() => {
    const storedKey = localStorage.getItem('suno_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  function handleSaveKey(key) {
    localStorage.setItem('suno_api_key', key);
    setApiKey(key);
    setShowModal(false);
  }

  const tabs = [
    { id: 'music', label: 'Generate Music' },
    { id: 'lyrics', label: 'Generate Lyrics' },
    { id: 'extend', label: 'Extend Music' },
    { id: 'video', label: 'Create Music Video' },
    { id: 'upload', label: 'Upload Audio' },
    { id: 'vocal', label: 'Vocals & Instrumental' },
    { id: 'convert', label: 'Convert To WAV' },
    { id: 'timestamped', label: 'Timestamped Lyrics' },
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case 'music': return <MusicGenerator apiKey={apiKey} />;
      case 'lyrics': return <LyricsGenerator apiKey={apiKey} />;
      case 'extend': return <MusicExtender apiKey={apiKey} />;
      case 'video': return <MusicVideoCreator apiKey={apiKey} />;
      case 'upload': return <AudioUploader apiKey={apiKey} />;
      case 'vocal': return <VocalInstrumentalManager apiKey={apiKey} />;
      case 'convert': return <AudioConverter apiKey={apiKey} />;
      case 'timestamped': return <TimestampedLyrics apiKey={apiKey} />;
      default: return null;
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Suno.ai Music Web App</h1>
        <button onClick={() => setShowModal(true)} className="btn-key">Set API Key</button>
      </header>

      <nav className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${tab.id === currentTab ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main>
        {apiKey ? (renderTabContent()) : (<p>Please set your API key to get started.</p>)}
      </main>

      {showModal && <APIKeyModal onSave={handleSaveKey} onClose={() => setShowModal(false)} />}

      <style jsx>{`
        .container {
          padding: 2rem;
          max-width: 900px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          border-radius: 16px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          align-items: center;
        }
        .title {
          font-size: 2rem;
          font-weight: 700;
        }
        .btn-key {
          background: rgba(255, 255, 255, 0.3);
          border: none;
          color: #ffffff;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .btn-key:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        .tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
          justify-content: center;
        }
        .tab-btn {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #fff;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease;
        }
        .tab-btn.active, .tab-btn:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        main {
          flex-grow: 1;
          padding-bottom: 4rem;
        }
        p {
          font-size: 1.2rem;
          margin-top: 3rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
