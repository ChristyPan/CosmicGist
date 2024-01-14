import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from "./WallPaperPink.jpg";


function App() {
  const [inputValue, setInputValue] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
  const [priorURLs, setPriorURLs] = useState([]);

  useEffect(() => {
    const storedURLs = localStorage.getItem('priorURLs');
    if (storedURLs) {
      setPriorURLs(JSON.parse(storedURLs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('priorURLs', JSON.stringify(priorURLs));
  }, [priorURLs]);

  const handleSummarize = async () => {
    try {
      // Simple URL validation using a regular expression
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(inputValue)) {
        console.error('Invalid URL');
        return;
      }
  
      const response = await axios.post('/api/summarize', { url: inputValue });
      const newSummary = response.data.summarizedText;
  
      // Update the state with the new summary and add it to prior summaries
      setSummarizedText(newSummary);
      
      // Check if the URL is not already in the list before adding it
      setPriorURLs([...priorURLs, inputValue]);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <header className="App-header">
        <h1 style={{ marginTop: '-10px', borderBottom: '2px solid #fff', fontFamily: "Poppins-Bold" }}>Website Summarizer</h1>

        {/* Input box */}
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
          style={{ marginTop: '10px', marginLeft: '-500px', padding: '15px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '5px', color: '#555', fontFamily: 'Roboto-Medium'}}
        />

        {/* Summarize Button */}
        <button
          style={{ marginTop: '-45px', marginLeft: '-100px', padding: '12px', fontSize: '16px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Summarize
        </button>

        {/* Past Search Header */}
        <label
          style={{marginTop: '-45px', marginLeft: '1000px', padding: '12px', fontSize: '16px', background: '#942b68', color: '#fff', border: 'none', borderRadius: '5px'}}>
          Recently Searched
        </label>

        {/* Summarize block */}
        <div style={{ marginTop: '30px', marginRight: '200px', border: '1px solid #ccc', padding: '2px', backgroundColor: '#ffffff', borderRadius: '5px', height: '375px', width: '850px', overflowY: 'auto' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#555', maxHeight: '340px', overflowY: 'auto' }}>{summarizedText}</p>
        </div>

        {/* Past Searches block */}
        <div style={{ marginTop: '-385px', marginLeft: '1000px', padding: '5px', height: '400px', width: '300px', overflowY: 'auto', boxSizing: 'border-box' }}>
          {priorURLs.map((summary, index) => (
            <p key={index} style={{ fontSize: '12px', border: '1px solid #ccc', borderRadius: '5px', padding: '8px', margin: '5px 0', overflowX: 'hidden' }}>{summary}</p>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
