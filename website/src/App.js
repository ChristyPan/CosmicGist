import './App.css';

import React, { useState } from 'react';

function App() {
  // State to store the value of the input
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Website Summerizer</h1>

        {/* Input box with onChange handler to update the state */}
        <input
          type="text"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </header>
    </div>
  );
}


export default App;
