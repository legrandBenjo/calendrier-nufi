import CalendrierPersonnes from './CalendrierPersonnes';
import Swipe from 'react-swipe';
import { useState } from 'react';
import './App.css';
import { mois } from './components/Mois'

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleSwipeLeft = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth( (newMonth.getMonth() - 1 + mois.length) % mois.length);
    setCurrentMonth(newMonth);
  }

  const handleSwipeRight = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth( (newMonth.getMonth() + 1 ) % mois.length);
    setCurrentMonth(newMonth);
  }

  return (
    <div className="tc">
      <h1>Ŋwɑ̀'nǐsáhlīē' 2023</h1>
      <Swipe onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight}>
        <CalendrierPersonnes currentMonth={currentMonth} />
      </Swipe>
    </div>
  );
}

export default App;