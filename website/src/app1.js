import './App.css';

import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [summarizedText, setSummarizedText] = useState('');

  const handleSummarize = async () => {
    try {
      const response = await axios.post('/api/summarize', { url: inputValue });
      setSummarizedText(response.data.summarizedText);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="App" style={{ padding: '20px' }}>
      <header className="App-header">
        <h1 style={{ marginTop: '-55px', borderBottom: '2px solid #fff' }}>Website Summarizer</h1>

        {/* Input box with onChange handler to update the state */}
        <input
        type="text"
        placeholder="Enter Website URL"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSummarize();
          }
        }}
        style={{ padding: '15px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '5px' }}
      />

      <button 
        onClick={handleSummarize} 
        style={{ marginTop: '-15px', marginLeft: '1150px', padding: '20px', fontSize: '16px', background: '#6495ed', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Recently Viewed 
      </button>

      <button 
        onClick={handleSummarize} 
        style={{ marginTop: '15px', marginLeft: '5px', padding: '12px', fontSize: '16px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Summarize
      </button>

        {/* Display summarized text in a box */}
          <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '2px', backgroundColor: '#e6e6e6', borderRadius: '5px', height: '375px', width: '850px'}}>
            <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#555', overflowY: 'auto', maxHeight: '340px' }}>{summarizedText}</p>
            
          </div>
      </header>
    </div>
  );
}

export default App;

