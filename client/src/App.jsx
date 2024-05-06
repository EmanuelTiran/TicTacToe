import { useState } from 'react';

import { useContext } from 'react';

import './App.css'
import Board from './components/Board'
import DataContext from './components/DataContext';
import Btn from './components/Btn';
import Popup from './components/Popup';

function App() {
  const [text, setText] = useState("meir");
  const [open, setOpen] = useState(false);
  return (
    <>
      <DataContext.Provider value={{ text, setText, open, setOpen }}>
        <Board />
        <Btn value={"play again"} />
        <Popup />
      </DataContext.Provider>

    </>
  )
}

export default App
