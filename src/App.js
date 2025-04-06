import React, { useState } from "react";
import "./App.css";



function App() {
  const [foodInput, setFoodInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [dailyList, setDailyList] = useState([]);

  const foodDatabase = {
    "idli": { calories: 58, protein: 2, carbs: 12, fat: 0.4 },
  "dosa": { calories: 133, protein: 3, carbs: 17, fat: 5 },
  "samosa": { calories: 262, protein: 4, carbs: 32, fat: 13 },
  "kachori": { calories: 200, protein: 3, carbs: 25, fat: 10 },
  "biryani": { calories: 290, protein: 6, carbs: 35, fat: 12 },
  "poha": { calories: 180, protein: 2, carbs: 25, fat: 6 },
  "upma": { calories: 210, protein: 4, carbs: 30, fat: 7 },
  "chapati": { calories: 104, protein: 3, carbs: 15, fat: 3 },
  "paratha": { calories: 210, protein: 5, carbs: 25, fat: 10 },
  "rajma": { calories: 140, protein: 7, carbs: 23, fat: 1 },
  "chole": { calories: 160, protein: 8, carbs: 22, fat: 2 },
  "paneer butter masala": { calories: 350, protein: 10, carbs: 12, fat: 28 },
  "butter naan": { calories: 300, protein: 7, carbs: 35, fat: 12 },
  "dal tadka": { calories: 180, protein: 9, carbs: 20, fat: 5 },
  "tandoori chicken": { calories: 250, protein: 27, carbs: 3, fat: 14 },
  "fish curry": { calories: 200, protein: 20, carbs: 5, fat: 10 },
  "egg curry": { calories: 230, protein: 13, carbs: 5, fat: 15 },
  "mutton curry": { calories: 300, protein: 20, carbs: 7, fat: 22 },
  "vada pav": { calories: 295, protein: 4, carbs: 35, fat: 15 },
  "pav bhaji": { calories: 400, protein: 6, carbs: 45, fat: 20 },
  "aloo paratha": { calories: 280, protein: 6, carbs: 36, fat: 12 },
  "misal pav": { calories: 310, protein: 10, carbs: 32, fat: 16 },
  "sev puri": { calories: 240, protein: 4, carbs: 30, fat: 10 },
  "pani puri": { calories: 150, protein: 2, carbs: 22, fat: 5 },
  "dhokla": { calories: 150, protein: 6, carbs: 20, fat: 6 },
  "thepla": { calories: 190, protein: 4, carbs: 24, fat: 8 },
  "handvo": { calories: 220, protein: 7, carbs: 22, fat: 10 },
  "basmati rice": { calories: 130, protein: 2, carbs: 28, fat: 0.3 },
  "jeera rice": { calories: 150, protein: 3, carbs: 30, fat: 2 },
  "curd rice": { calories: 140, protein: 4, carbs: 22, fat: 4 },
  "lemon rice": { calories: 160, protein: 3, carbs: 28, fat: 5 },
  "egg fried rice": { calories: 210, protein: 7, carbs: 30, fat: 7 },
  "ghee rice": { calories: 250, protein: 3, carbs: 32, fat: 10 },
  "puliyogare": { calories: 220, protein: 4, carbs: 30, fat: 9 },
  "pongal": { calories: 180, protein: 5, carbs: 26, fat: 6 },
  "sabudana khichdi": { calories: 250, protein: 3, carbs: 42, fat: 8 },
  "moong dal": { calories: 105, protein: 7, carbs: 15, fat: 1 },
  "sprouts salad": { calories: 95, protein: 8, carbs: 12, fat: 1 },
  "fruit chaat": { calories: 90, protein: 1, carbs: 20, fat: 0.5 },
  "kheer": { calories: 215, protein: 5, carbs: 30, fat: 9 },
  "halwa": { calories: 350, protein: 4, carbs: 45, fat: 15 },
  "gulab jamun": { calories: 150, protein: 2, carbs: 20, fat: 7 },
  "rasgulla": { calories: 125, protein: 3, carbs: 20, fat: 2 },
  "rasmalai": { calories: 250, protein: 6, carbs: 28, fat: 12 },
  "malpua": { calories: 310, protein: 5, carbs: 40, fat: 14 },
  "jalebi": { calories: 150, protein: 1, carbs: 30, fat: 5 },
  "ladoo": { calories: 180, protein: 2, carbs: 25, fat: 7 },
  "barfi": { calories: 220, protein: 3, carbs: 28, fat: 10 },
  "peda": { calories: 160, protein: 3, carbs: 20, fat: 6 },
  "sheer kurma": { calories: 280, protein: 6, carbs: 30, fat: 12 },
  "basundi": { calories: 250, protein: 5, carbs: 30, fat: 10 },
  "shrikhand": { calories: 240, protein: 6, carbs: 28, fat: 9 },
  "paneer tikka": { calories: 200, protein: 14, carbs: 4, fat: 12 },
  "chicken tikka": { calories: 250, protein: 28, carbs: 3, fat: 14 },
  "veg pulao": { calories: 190, protein: 4, carbs: 30, fat: 6 },
  "kadhi": { calories: 130, protein: 5, carbs: 12, fat: 5 },
  "lauki sabzi": { calories: 80, protein: 2, carbs: 10, fat: 3 },
  "baingan bharta": { calories: 120, protein: 3, carbs: 10, fat: 6 },
  "bhindi masala": { calories: 130, protein: 2, carbs: 14, fat: 7 },
  "aloo gobi": { calories: 160, protein: 3, carbs: 18, fat: 8 },
  "gajar halwa": { calories: 250, protein: 4, carbs: 30, fat: 12 },
  "kanda bhaji": { calories: 200, protein: 3, carbs: 24, fat: 10 },
  "thalipeeth": { calories: 180, protein: 5, carbs: 25, fat: 6 },
  "modak": { calories: 120, protein: 2, carbs: 20, fat: 5 }
  // You can continue adding more if needed
  };

  const handleSearch = () => {
    const query = foodInput.trim().toLowerCase();
    if (foodDatabase[query]) {
      const foodData = foodDatabase[query];
      setSearchResult({ name: query, ...foodData });
      setNotFound(false);
      setDailyList((prev) => [...prev, { name: query, ...foodData }]);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
    setFoodInput("");
  };

  const total = dailyList.reduce(
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
      <h1>🍃 Indian Food Tracker</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Indian food..."
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
        />
        <button onClick={handleSearch}>Add</button>
      </div>

      {searchResult && (
        <div className="search-results">
          <h3>{searchResult.name.toUpperCase()}</h3>
          <ul>
            <li><strong>Calories:</strong> {searchResult.calories} kcal</li>
            <li><strong>Protein:</strong> {searchResult.protein} g</li>
            <li><strong>Carbs:</strong> {searchResult.carbs} g</li>
            <li><strong>Fat:</strong> {searchResult.fat} g</li>
          </ul>
        </div>
      )}

      {notFound && (
        <div className="search-results">
          <p>❌ Sorry, we don't have data for "<strong>{foodInput}</strong>"</p>
        </div>
      )}

      <div className="daily-tracker">
        <h2>📊 Daily Summary</h2>
        <p><strong>Total Calories:</strong> {total.calories} kcal</p>
        <p><strong>Total Protein:</strong> {total.protein} g</p>
        <p><strong>Total Carbs:</strong> {total.carbs} g</p>
        <p><strong>Total Fat:</strong> {total.fat} g</p>

        <div className="food-list">
          {dailyList.map((item, index) => (
            <p key={index}>
              🍴 <strong>{item.name}</strong> – {item.calories} kcal, {item.protein}g P, {item.carbs}g C, {item.fat}g F
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
