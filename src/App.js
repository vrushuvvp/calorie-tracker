import React, { useState, useEffect } from 'react';
import './App.css';

// Indian food items with calories, protein, carbs, fat
const foodData = {
  "idli": { calories: 58, protein: 2, carbs: 12, fat: 0.4 },
  "masala dosa": { calories: 250, protein: 6, carbs: 30, fat: 10 },
  "ghee roast dosa": { calories: 300, protein: 7, carbs: 35, fat: 15 },
  "podi idli": { calories: 180, protein: 4, carbs: 25, fat: 8 },
  "masala papad": { calories: 100, protein: 2, carbs: 12, fat: 5 },
  "jowar roti": { calories: 120, protein: 3, carbs: 24, fat: 2 },
  "poha": { calories: 180, protein: 2, carbs: 25, fat: 6 },
  "chapati": { calories: 104, protein: 3, carbs: 15, fat: 3 },
  "rajma": { calories: 140, protein: 7, carbs: 23, fat: 1 },
  "makki di roti": { calories: 150, protein: 3, carbs: 30, fat: 3 },
  "sarson da saag": { calories: 180, protein: 6, carbs: 12, fat: 9 },
  "badnekayi palya": { calories: 90, protein: 2, carbs: 10, fat: 5 },
  "ennegayi": { calories: 130, protein: 3, carbs: 12, fat: 7 },
  "chow chow bath": { calories: 280, protein: 5, carbs: 35, fat: 10 },
  "dal makhani": { calories: 300, protein: 11, carbs: 22, fat: 15 },
  "butter chicken": { calories: 430, protein: 30, carbs: 10, fat: 30 },
  "paneer tikka": { calories: 200, protein: 14, carbs: 4, fat: 12 },
  "veg pulao": { calories: 190, protein: 4, carbs: 30, fat: 6 },
  "aloo gobi": { calories: 160, protein: 3, carbs: 18, fat: 8 },
  "bhindi masala": { calories: 130, protein: 2, carbs: 14, fat: 7 },
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
  "modak": { calories: 120, protein: 2, carbs: 20, fat: 5 },
  "jowar roti": { calories: 100, protein: 3, carbs: 20, fat: 1 },
  "ragi mudde": { calories: 150, protein: 2, carbs: 30, fat: 1 },
  "bisi bele bath": { calories: 250, protein: 6, carbs: 40, fat: 9 },
  "akki roti": { calories: 160, protein: 2, carbs: 28, fat: 4 },
  "avial": { calories: 180, protein: 4, carbs: 14, fat: 10 },
  "sambar": { calories: 120, protein: 6, carbs: 18, fat: 3 },
  "rasam": { calories: 50, protein: 2, carbs: 7, fat: 1 },
  "poriyal": { calories: 90, protein: 2, carbs: 8, fat: 5 },
  "kootu": { calories: 110, protein: 4, carbs: 12, fat: 4 },
  "chettinad chicken": { calories: 300, protein: 26, carbs: 5, fat: 18 },
  "malabar parotta": { calories: 330, protein: 5, carbs: 35, fat: 20 },
  "puttu": { calories: 210, protein: 3, carbs: 40, fat: 4 },
  "kadala curry": { calories: 190, protein: 8, carbs: 20, fat: 6 },
  "appam": { calories: 120, protein: 2, carbs: 25, fat: 2 },
  "stew": { calories: 180, protein: 5, carbs: 15, fat: 9 },
  "upma": { calories: 210, protein: 4, carbs: 30, fat: 7 },
  "ven pongal": { calories: 230, protein: 5, carbs: 32, fat: 9 },
  "lemon rice": { calories: 160, protein: 3, carbs: 28, fat: 5 },
  "tamarind rice": { calories: 220, protein: 4, carbs: 30, fat: 9 },
  "curd rice": { calories: 140, protein: 4, carbs: 22, fat: 4 },
  "dosakaya pappu": { calories: 180, protein: 5, carbs: 20, fat: 5 },
  "gutti vankaya": { calories: 150, protein: 3, carbs: 10, fat: 10 },
  "baingan curry": { calories: 130, protein: 2, carbs: 10, fat: 8 },
  "pesarattu": { calories: 180, protein: 7, carbs: 20, fat: 5 },
  "medu vada": { calories: 150, protein: 3, carbs: 15, fat: 7 },
  "banana bajji": { calories: 170, protein: 2, carbs: 20, fat: 8 },
  "mango pachadi": { calories: 110, protein: 1, carbs: 14, fat: 5 },
  "coconut chutney": { calories: 100, protein: 1, carbs: 3, fat: 9 },
  "mint chutney": { calories: 60, protein: 1, carbs: 5, fat: 3 },
  "onion tomato chutney": { calories: 80, protein: 1, carbs: 8, fat: 4 },
  "idiyappam": { calories: 150, protein: 2, carbs: 32, fat: 1 },
  "veg kurma": { calories: 200, protein: 5, carbs: 18, fat: 10 },
  "sundal": { calories: 160, protein: 7, carbs: 20, fat: 5 },
  "kharabath": { calories: 240, protein: 5, carbs: 35, fat: 8 },
  "rava kichdi": { calories: 230, protein: 4, carbs: 34, fat: 9 },
  "rice payasam": { calories: 220, protein: 4, carbs: 35, fat: 8 },
  "kesari bath": { calories: 250, protein: 3, carbs: 40, fat: 10 },
  "mysore pak": { calories: 320, protein: 4, carbs: 30, fat: 20 },
  "unniyappam": { calories: 190, protein: 2, carbs: 25, fat: 9 },
  "adai": { calories: 200, protein: 7, carbs: 28, fat: 6 },
  "kuzhi paniyaram": { calories: 140, protein: 3, carbs: 20, fat: 5 },
  "neer dosa": { calories: 100, protein: 2, carbs: 20, fat: 1 },
  "kharabath": { calories: 210, protein: 5, carbs: 30, fat: 8 },
  "moru curry": { calories: 90, protein: 2, carbs: 8, fat: 4 },
  "yam fry": { calories: 150, protein: 2, carbs: 15, fat: 7 },
  "snake gourd curry": { calories: 90, protein: 2, carbs: 10, fat: 3 },
  "keerai masiyal": { calories: 80, protein: 4, carbs: 6, fat: 2 },
  "thayir pachadi": { calories: 100, protein: 3, carbs: 5, fat: 4 },
  "masala dosa": { calories: 230, protein: 5, carbs: 30, fat: 10 },
  "ghee roast dosa": { calories: 260, protein: 5, carbs: 32, fat: 12 },
  "podi idli": { calories: 200, protein: 4, carbs: 28, fat: 8 },
  "masala papad": { calories: 120, protein: 2, carbs: 10, fat: 6 },
  "mysore masala dosa": { calories: 280, protein: 6, carbs: 35, fat: 12 },
  "paneer dosa": { calories: 300, protein: 10, carbs: 35, fat: 14 },
  "cheese dosa": { calories: 330, protein: 9, carbs: 36, fat: 16 },
  "rava dosa": { calories: 180, protein: 4, carbs: 25, fat: 7 },
  "set dosa": { calories: 150, protein: 3, carbs: 22, fat: 5 },
  "neer dosa": { calories: 100, protein: 2, carbs: 20, fat: 1 },
  "banana dosa": { calories: 200, protein: 3, carbs: 30, fat: 6 },
  "oats dosa": { calories: 160, protein: 5, carbs: 20, fat: 4 },
  "quinoa dosa": { calories: 180, protein: 6, carbs: 22, fat: 5 },
  "ragi dosa": { calories: 150, protein: 4, carbs: 20, fat: 4 },
  "poha dosa": { calories: 190, protein: 4, carbs: 26, fat: 6 },
  "kadai paneer": { calories: 280, protein: 12, carbs: 14, fat: 18 },
  "palak paneer": { calories: 220, protein: 10, carbs: 10, fat: 14 },
  "methi thepla": { calories: 180, protein: 4, carbs: 22, fat: 8 },
  "besan chilla": { calories: 140, protein: 7, carbs: 16, fat: 6 },
  "moong dal chilla": { calories: 130, protein: 8, carbs: 14, fat: 4 },
  "sabudana vada": { calories: 250, protein: 3, carbs: 30, fat: 12 },
  "bread upma": { calories: 200, protein: 4, carbs: 28, fat: 7 },
  "egg dosa": { calories: 220, protein: 8, carbs: 28, fat: 8 },
  "bombay sandwich": { calories: 270, protein: 6, carbs: 32, fat: 10 },
  "pav sandwich": { calories: 300, protein: 7, carbs: 35, fat: 14 },
  "corn chaat": { calories: 180, protein: 4, carbs: 26, fat: 6 },
  "sweet corn soup": { calories: 90, protein: 3, carbs: 14, fat: 2 },
  "tomato rasam": { calories: 60, protein: 2, carbs: 8, fat: 2 },
  "pepper rasam": { calories: 70, protein: 2, carbs: 7, fat: 3 },
  "vada curry": { calories: 210, protein: 6, carbs: 18, fat: 10 },
  "mini idli sambar": { calories: 190, protein: 5, carbs: 28, fat: 6 },
  "sagu dosa": { calories: 230, protein: 6, carbs: 30, fat: 10 },
  "veg stew": { calories: 170, protein: 5, carbs: 18, fat: 8 },
  "veg chettinad": { calories: 220, protein: 6, carbs: 20, fat: 10 },
  "paneer ghee roast": { calories: 320, protein: 12, carbs: 10, fat: 24 },
  "egg roast": { calories: 240, protein: 12, carbs: 8, fat: 16 },
  "chole bhature": { calories: 450, protein: 12, carbs: 40, fat: 25 },
  "paneer bhurji": { calories: 320, protein: 14, carbs: 10, fat: 24 },
  "dal makhani": { calories: 280, protein: 11, carbs: 20, fat: 15 },
  "butter chicken": { calories: 430, protein: 28, carbs: 12, fat: 30 },
  "chicken curry": { calories: 350, protein: 26, carbs: 10, fat: 20 },
  "shahi paneer": { calories: 370, protein: 14, carbs: 15, fat: 28 },
  "kadai chicken": { calories: 320, protein: 30, carbs: 8, fat: 18 },
  "baingan curry": { calories: 140, protein: 3, carbs: 12, fat: 8 },
  "methi aloo": { calories: 170, protein: 3, carbs: 18, fat: 9 },
  "bhindi fry": { calories: 150, protein: 3, carbs: 14, fat: 7 },
  "tawa roti": { calories: 85, protein: 3, carbs: 15, fat: 1 },
  "naan": { calories: 260, protein: 7, carbs: 35, fat: 10 },
  "missi roti": { calories: 120, protein: 4, carbs: 18, fat: 4 },
  "makki di roti": { calories: 150, protein: 3, carbs: 22, fat: 5 },
  "sarson da saag": { calories: 180, protein: 6, carbs: 10, fat: 12 },
  "aloobaingan": { calories: 160, protein: 4, carbs: 18, fat: 7 },
  "kadhi pakora": { calories: 220, protein: 7, carbs: 20, fat: 10 },
  "raita": { calories: 100, protein: 4, carbs: 6, fat: 6 },
  "kebabs": { calories: 250, protein: 20, carbs: 5, fat: 15 },
  "malai kofta": { calories: 380, protein: 10, carbs: 15, fat: 30 },
  "veg kofta": { calories: 340, protein: 9, carbs: 20, fat: 25 },
  "lachha paratha": { calories: 200, protein: 4, carbs: 25, fat: 10 },
  "puri": { calories: 110, protein: 2, carbs: 12, fat: 6 },
  "dahi bhalla": { calories: 150, protein: 5, carbs: 20, fat: 6 },
  "aloo tikki": { calories: 180, protein: 3, carbs: 22, fat: 9 },
  "kathi roll": { calories: 300, protein: 10, carbs: 30, fat: 15 },
  "rajma chawal": { calories: 380, protein: 12, carbs: 45, fat: 10 },
  "matar paneer": { calories: 280, protein: 10, carbs: 16, fat: 20 },
  "gobi paratha": { calories: 210, protein: 5, carbs: 28, fat: 8 },
  "mooli paratha": { calories: 190, protein: 4, carbs: 26, fat: 7 },
  "pyaaz paratha": { calories: 200, protein: 4, carbs: 26, fat: 8 },
  "lassi": { calories: 180, protein: 6, carbs: 18, fat: 8 },
  "chaach": { calories: 50, protein: 2, carbs: 5, fat: 2 },
  "sooji halwa": { calories: 300, protein: 4, carbs: 40, fat: 14 },
  "jaljeera": { calories: 30, protein: 0, carbs: 5, fat: 0 },
  "khichdi": { calories: 220, protein: 6, carbs: 30, fat: 7 },
  "tamarind rice": { calories: 210, protein: 3, carbs: 28, fat: 9 },
  "sarson da saag": { calories: 180, protein: 6, carbs: 10, fat: 12 },
  "makki di roti": { calories: 150, protein: 3, carbs: 22, fat: 5 },
  "butter chicken": { calories: 430, protein: 28, carbs: 12, fat: 30 },
  "dal makhani": { calories: 280, protein: 11, carbs: 20, fat: 15 },
  "paneer tikka": { calories: 200, protein: 14, carbs: 4, fat: 12 },
  "rajma masala": { calories: 240, protein: 10, carbs: 28, fat: 6 },
  "kadai paneer": { calories: 320, protein: 12, carbs: 18, fat: 22 },
  "chole masala": { calories: 230, protein: 9, carbs: 24, fat: 8 },
  "bhindi do pyaza": { calories: 170, protein: 3, carbs: 16, fat: 10 },
  "aloo paratha": { calories: 280, protein: 6, carbs: 36, fat: 12 },
  "gobi paratha": { calories: 210, protein: 5, carbs: 28, fat: 8 },
  "lachha paratha": { calories: 200, protein: 4, carbs: 25, fat: 10 },
  "pindi chana": { calories: 220, protein: 9, carbs: 22, fat: 7 },
  "amritsari kulcha": { calories: 320, protein: 7, carbs: 38, fat: 14 },
  "tandoori roti": { calories: 120, protein: 4, carbs: 22, fat: 2 },
  "punjabi kadhi": { calories: 210, protein: 8, carbs: 15, fat: 12 },
  "methi malai matar": { calories: 280, protein: 8, carbs: 14, fat: 20 },
  "shahi paneer": { calories: 370, protein: 14, carbs: 15, fat: 28 },
  "matar paneer": { calories: 280, protein: 10, carbs: 16, fat: 20 },
  "malai kofta": { calories: 380, protein: 10, carbs: 15, fat: 30 },
  "punjabi lassi": { calories: 180, protein: 6, carbs: 18, fat: 8 },
  "boondi raita": { calories: 150, protein: 4, carbs: 8, fat: 10 },
  "mango lassi": { calories: 200, protein: 5, carbs: 28, fat: 6 },
  "kesar phirni": { calories: 250, protein: 6, carbs: 28, fat: 12 },
  "gajar ka halwa": { calories: 250, protein: 4, carbs: 30, fat: 12 },
  "besan laddoo": { calories: 180, protein: 3, carbs: 20, fat: 10 },
  "pinni": { calories: 210, protein: 5, carbs: 22, fat: 12 },
  "jolad rotti": { calories: 100, protein: 2, carbs: 20, fat: 1 },
  "ennegayi": { calories: 180, protein: 3, carbs: 8, fat: 15 },
  "yenne badanekai": { calories: 190, protein: 4, carbs: 10, fat: 14 },
  "soppina palya": { calories: 90, protein: 3, carbs: 6, fat: 5 },
  "bisi bele bath": { calories: 320, protein: 8, carbs: 40, fat: 12 },
  "chutney pudi": { calories: 80, protein: 2, carbs: 4, fat: 6 },
  "hittina palya": { calories: 220, protein: 5, carbs: 24, fat: 10 },
  "ragi mudde": { calories: 130, protein: 2, carbs: 27, fat: 0.5 },
  "kharabath": { calories: 250, protein: 5, carbs: 30, fat: 10 },
  "avalakki oggarane": { calories: 200, protein: 4, carbs: 32, fat: 8 },
  "kharabath": { calories: 240, protein: 4, carbs: 28, fat: 10 },
  "pundi": { calories: 110, protein: 2, carbs: 22, fat: 2 },
  "kadubu": { calories: 160, protein: 3, carbs: 30, fat: 3 },
  "uppittu": { calories: 210, protein: 4, carbs: 32, fat: 7 },
  "menthya chutney": { calories: 60, protein: 1, carbs: 4, fat: 4 },
  "mirchi bajji": { calories: 190, protein: 3, carbs: 20, fat: 10 },
  "nigerunde": { calories: 150, protein: 4, carbs: 18, fat: 8 },
  "shenga chutney": { calories: 110, protein: 3, carbs: 5, fat: 8 },
  "karabath": { calories: 220, protein: 4, carbs: 30, fat: 8 },
  "huchchellu chutney": { calories: 90, protein: 2, carbs: 4, fat: 7 }
  // Add more items if needed
};

function App() {
  const [search, setSearch] = useState('');
  const [log, setLog] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const storedLog = localStorage.getItem('foodLog');
    if (storedLog) {
      setLog(JSON.parse(storedLog));
    }
  }, []);

  // Save to localStorage whenever log changes
  useEffect(() => {
    localStorage.setItem('foodLog', JSON.stringify(log));
  }, [log]);

  const handleAdd = () => {
    const item = foodData[search.toLowerCase()];
    if (item) {
      setLog([...log, { name: search, ...item }]);
    } else {
      alert("Food item not found in database!");
    }
    setSearch('');
  };
  const handleClear = () => {
    setLog([]);
    localStorage.removeItem("foodLog");
  };
  

  const totals = log.reduce((acc, item) => {
    acc.calories += item.calories;
    acc.protein += item.protein;
    acc.carbs += item.carbs;
    acc.fat += item.fat;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="container">
      <h1>Indian Food Macro Tracker 🍛</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Indian food name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleClear} className="clear-btn">Clear</button>

        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="log">
        {log.map((item, idx) => (
          <div key={idx} className="entry">
            <strong>{item.name}</strong> — {item.calories} kcal | Protein: {item.protein}g | Carbs: {item.carbs}g | Fat: {item.fat}g
          </div>
        ))}
      </div>

      <div className="summary">
        <h3>Daily Totals</h3>
        <p>Calories: {totals.calories} kcal</p>
        <p>Protein: {totals.protein} g</p>
        <p>Carbs: {totals.carbs} g</p>
        <p>Fat: {totals.fat} g</p>
      </div>
    </div>
  );
}

export default App;
