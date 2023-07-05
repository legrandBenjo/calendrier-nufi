import React from 'react'
// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendrierPersonnes from './CalendrierPersonnes';
import InfoMarcheJour from './components/InfoMarcheJour';
import './App.css';

function App() {
  return (
    <div className="tc">
      <h1>Ŋwɑ̀'nǐsáhlīē' 2023</h1>
      <Router>
        <Routes>
          <Route path="/calendrier-nufi" element={<CalendrierPersonnes />} />
          <Route path="/info-marche-jour" element={<InfoMarcheJour />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
