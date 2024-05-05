import { useState } from 'react';

import { useContext } from 'react';

import './App.css'
import Board from './components/Board'
import DataContext from './components/DataContext';
import Btn from './components/Btn';

function App() {
  const [pop, setPop] = useState();

  return (
    <>
      <DataContext.Provider value={{ pop }}>
        <Board />
        <Btn value={"solo"}/>
      </DataContext.Provider>
      
    </>
  )
}

export default App
