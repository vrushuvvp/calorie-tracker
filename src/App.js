import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import "./App.css";
import foodData from "./foodData";

function App() {
  const [search, setSearch] = useState("");
  const [log, setLog] = useState([]);
  const [suggestion, setSuggestion] = useState(null);

  const foodItems = Object.keys(foodData);

  const fuse = new Fuse(foodItems, {
    includeScore: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const storedLog = localStorage.getItem("foodLog");
    if (storedLog) {
      setLog(JSON.parse(storedLog));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("foodLog", JSON.stringify(log));
  }, [log]);

  const handleAdd = () => {
    const food = search.trim().toLowerCase();
    const matchedFood = foodItems.find(
      (item) => item.toLowerCase() === food
    );
    if (matchedFood) {
      setLog([...log, { name: matchedFood, ...foodData[matchedFood] }]);
      setSearch("");
      setSuggestion(null);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setSuggestion(null);
      return;
    }

    const results = fuse.search(value);
    if (results.length > 0) {
      setSuggestion(results[0].item);
    } else {
      setSuggestion(null);
    }
  };

  const handleClear = () => {
    setLog([]);
    localStorage.removeItem("foodLog");
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
    <div className="App">
      <h1>🥬 Indian Food Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Indian food..."
          value={search}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {suggestion && (
        <p className="suggestion">
          Did you mean: <em>{suggestion}</em>?
        </p>
      )}

      {log.map((item, index) => (
        <div className="card" key={index}>
          <h2>{item.name.toUpperCase()}</h2>
          <ul>
            <li>
              <strong>Calories:</strong> {item.calories} kcal
            </li>
            <li>
              <strong>Protein:</strong> {item.protein} g
            </li>
            <li>
              <strong>Carbs:</strong> {item.carbs} g
            </li>
            <li>
              <strong>Fat:</strong> {item.fat} g
            </li>
          </ul>
        </div>
      ))}

      {log.length > 0 && (
        <div className="summary">
          <h2>📊 Daily Summary</h2>
          <p>
            <strong>Total Calories:</strong> {totals.calories} kcal
          </p>
          <p>
            <strong>Total Protein:</strong> {totals.protein} g
          </p>
          <p>
            <strong>Total Carbs:</strong> {totals.carbs} g
          </p>
          <p>
            <strong>Total Fat:</strong> {totals.fat} g
          </p>
          <button onClick={handleClear}>Clear</button>
        </div>
      )}
    </div>
  );
}

export default App;
