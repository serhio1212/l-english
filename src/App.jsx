import React, { useState, useEffect, useRef} from 'react';
import './App.css';

const NUM_ROWS = Math.floor(window.innerHeight / 20);

function App() {

  const [rows, setRows] = useState(
    Array.from({ length: NUM_ROWS }, () => ({ text: '', isEditing: false, countEnter: 3 }))
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedIndexRef = useRef(0);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      const currentIndex = selectedIndexRef.current;

    if (e.key === 'Escape') {
      e.target.blur();
    }
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) =>
        { const next = prev < rows.length - 1 ? prev + 1 : prev;
          console.log("ArrowDown to row:", next);
          return next;}
      );
      
    }
    if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => {const next = prev > 0 ? prev - 1 : prev;
      console.log("ArrowUp to row:", next);
      return next;})
    }
    if (e.key === 'Enter') {
      setRows((prev) =>
        prev.map((row, i) =>
          i === currentIndex ? { ...row, isEditing: true } : row
        )
      );
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
            style={{
              backgroundColor: index === selectedIndex ? "#4caf50" : "#f0f0f0",
              color: index === selectedIndex ? "#fff" : "#000",
              textAlign: 0 === index%2 ? "left" : "right",
            }}
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
            style={{
              backgroundColor: index === selectedIndex ? "#4caf50" : "#f0f0f0",
              color: index === selectedIndex ? "#fff" : "#000",
              textAlign: 0 === index%2 ? "left" : "right",
            }}
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
