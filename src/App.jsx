import React, { useState } from 'react';
import './App.css';

const NUM_ROWS = Math.floor(window.innerHeight / 20); // number of 20px rows

function App() {
  const [rows, setRows] = useState(
    Array.from({ length: NUM_ROWS }, () => ({ text: '', isEditing: false, countEnter: 3 }))
  );

console.log(rows);
  const handleDivClick = (index) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, isEditing: true} : row
      )
    );
  };

  const handleTextChange = (e, index) => {
    const newText = e.target.value;
    setRows((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, text: newText } : row
      )
    );
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Escape') {
      e.target.blur(); // triggers the onBlur event
    }
  };


  const handleBlur = (index) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i === index) {
          const lineCount = row.text.split('\n').length;
          return { ...row, isEditing: false, countEnter: lineCount };
        }
        return row;
      })
    );
  };

  return (
    <div className="container">
      {rows.map((row, index) =>
        row.isEditing ? (
          <textarea
            key={index}
            className="row"
            rows={row.countEnter}
            value={row.text}
            onChange={(e) => handleTextChange(e, index)}
            onBlur={() => handleBlur(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            autoFocus
          />
        ) : (
          <div
            key={index}
            className="row"
            onClick={() => handleDivClick(index)}
          >
            {row.text}
          </div>
        )
      )}
    </div>
  );
}

export default App;
