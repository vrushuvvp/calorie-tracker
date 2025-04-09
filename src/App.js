import React, { useState, useEffect } from 'react';
import './App.css';
import Fuse from 'fuse.js';
import foodData from './foodData'; // make sure you create this

function App() {
  const [search, setSearch] = useState('');
  const [log, setLog] = useState([]);
  const [suggestion, setSuggestion] = useState(null);

  const fuse = new Fuse(Object.keys(foodData), {
    includeScore: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const stored = localStorage.getItem('log');
    if (stored) {
      setLog(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('log', JSON.stringify(log));
  }, [log]);

  const handleAdd = () => {
    const result = fuse.search(search);
    if (result.length > 0) {
      const bestMatch = result[0].item;
      const nutrition = foodData[bestMatch];
      setLog([...log, { name: bestMatch, ...nutrition }]);
      setSearch('');
      setSuggestion(null);
    } else {
      alert("No match found");
    }
  };

  const handleClear = () => {
    setLog([]);
    localStorage.removeItem('log');
  };

  useEffect(() => {
    if (search) {
      const result = fuse.search(search);
      if (result.length > 0) {
        setSuggestion(result[0].item);
      } else {
        setSuggestion(null);
      }
    } else {
      setSuggestion(null);
    }
  }, [search]);

  const total = log.reduce((acc, food) => {
    acc.calories += food.calories;
    acc.protein += food.protein;
    acc.carbs += food.carbs;
    acc.fat += food.fat;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="container">
      <h1>🥬 Indian Food Tracker</h1>
      <div className="input-section">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter Indian food..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      {suggestion && <div className="suggestion">Did you mean: <strong>{suggestion}</strong>?</div>}

      <div className="log">
        {log.map((item, idx) => (
          <div key={idx} className="card">
            <h3>{item.name.toUpperCase()}</h3>
            <ul>
              <li><b>Calories:</b> {item.calories} kcal</li>
              <li><b>Protein:</b> {item.protein} g</li>
              <li><b>Carbs:</b> {item.carbs} g</li>
              <li><b>Fat:</b> {item.fat} g</li>
            </ul>
          </div>
        ))}
      </div>

      {log.length > 0 && (
        <div className="summary card">
          <h2>📊 Daily Summary</h2>
          <p><b>Total Calories:</b> {total.calories} kcal</p>
          <p><b>Total Protein:</b> {total.protein} g</p>
          <p><b>Total Carbs:</b> {total.carbs} g</p>
          <p><b>Total Fat:</b> {total.fat} g</p>
          <button onClick={handleClear}>Clear All</button>
        </div>
      )}
    </div>
  );
}

export default App;
