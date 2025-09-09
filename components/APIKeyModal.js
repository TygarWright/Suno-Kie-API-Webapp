import React, { useState } from 'react';

export default function APIKeyModal({ onSave, onClose }) {
  const [key, setKey] = useState('');

  function handleSave() {
    if (key.trim()) {
      onSave(key.trim());
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Enter Suno.ai API Key</h2>
        <input
          type="text"
          placeholder="API Key"
          value={key}
          onChange={e => setKey(e.target.value)}
          style={styles.input}
        />
        <div style={styles.buttons}>
          <button onClick={handleSave} style={styles.saveBtn} disabled={!key.trim()}>
            Save
          </button>
          <button onClick={onClose} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#222',
    padding: '2rem',
    borderRadius: '10px',
    width: '400px',
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    margin: '1rem 0',
    borderRadius: '6px',
    border: 'none',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#f44336',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
  },
};
