import React, { useState } from "react";
import "./App.css";
import Fuse from "fuse.js";
import foodData from "./foodData";

function App() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState([]);
  const [suggestion, setSuggestion] = useState("");

  const foodItems = Object.keys(foodData);

  const fuse = new Fuse(foodItems, {
    includeScore: true,
    threshold: 0.3,
  });

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);

    if (val.trim() === "") {
      setSuggestion("");
      return;
    }

    const result = fuse.search(val);
    if (result.length > 0) {
      setSuggestion(result[0].item);
    } else {
      setSuggestion("");
    }
  };

  const handleAdd = () => {
    const name = input.trim().toLowerCase();
    const data = foodData[name];

    if (data) {
      setLog([...log, { name, ...data }]);
      setInput("");
      setSuggestion("");
    } else {
      alert("Food item not found.");
    }
  };

  const handleClear = () => {
    setLog([]);
  };

  const totals = log.reduce(
    (acc, item) => {
      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.carbs += item.carbs;
      acc.fat += item.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="container">
      <h1>🥬 Indian Food Tracker</h1>
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter Indian food..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {suggestion && suggestion !== input.trim().toLowerCase() && (
        <p className="suggestion">
          <em>Did you mean: <strong>{suggestion}</strong>?</em>
        </p>
      )}

      <div className="log">
        {log.map((item, index) => (
          <div key={index} className="card">
            <h3>{item.name.toUpperCase()}</h3>
            <ul>
              <li><strong>Calories:</strong> {item.calories} kcal</li>
              <li><strong>Protein:</strong> {item.protein} g</li>
              <li><strong>Carbs:</strong> {item.carbs} g</li>
              <li><strong>Fat:</strong> {item.fat} g</li>
            </ul>
          </div>
        ))}
      </div>

      {log.length > 0 && (
        <div className="summary">
          <h2>📊 Daily Summary</h2>
          <p><strong>Total Calories:</strong> {totals.calories} kcal</p>
          <p><strong>Total Protein:</strong> {totals.protein} g</p>
          <p><strong>Total Carbs:</strong> {totals.carbs} g</p>
          <p><strong>Total Fat:</strong> {totals.fat} g</p>
          <button className="clear-btn" onClick={handleClear}>Clear</button>
        </div>
      )}
    </div>
  );
}

export default App;
