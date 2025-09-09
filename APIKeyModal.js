import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function APIKeyModal({ onSave, onClose }) {
  const [keyInput, setKeyInput] = useState('');

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          padding: '2rem',
          width: '400px',
          backdropFilter: 'blur(20px)',
          color: '#fff',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Enter API Key</h2>
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Paste your API key here"
          style={{
            padding: '0.5rem',
            borderRadius: '8px',
            border: 'none',
            outline: 'none'
          }}
          autoFocus
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Cancel</button>
          <button
            onClick={() => {
              if (keyInput.trim()) onSave(keyInput.trim());
            }}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
            disabled={!keyInput.trim()}
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
