import React from 'react';
import './App.css';
import { MTGCollection } from './components/MTGCollection';

function App() {
  return (
    <div>
      <h1>Collector Oof</h1>
      <p>This application displays your Magic the Gathering card collection and prices them according to 80% of the sales price from face2facegames </p>
      <MTGCollection />
    </div>
  );
}

export default App;
