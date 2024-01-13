import './App.css';

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [summarizedText, setSummarizedText] = useState('');

  const handleSummarize = async () => {
    try {
      const response = await axios.post('/api/summarize', { text: inputValue });
      setSummarizedText(response.data.summarizedText);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="App" style={{ padding: '10px' }}>
      <header className="App-header">
        <h1 style={{ marginTop: '-50px' }}>Website Summarizer</h1>

        {/* Input box with onChange handler to update the state */}
        <input
          type="text"
          placeholder="Input a website URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
        />

        <button onClick={handleSummarize} style={{ padding: '10px', fontSize: '16px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Summarize
        </button>

        {/* Display summarized text in a box */}
          <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '2px', backgroundColor: '#e6e6e6', borderRadius: '5px', height: '350px', width: '800px'}}>
            <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#555', overflowY: 'auto', maxHeight: '300px' }}>{summarizedText}</p>
          </div>
      </header>
    </div>
  );
}

export default App;

