import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useContext } from 'react';

import './App.css'
import Board from './components/Board'
import DataContext from './components/DataContext';
import Btn from './components/Btn';
import Menu from './components/Menu';
import Popup from './components/Popup';
import Welcome from './components/Welcome';
import JoinGame from './components/JoinGame.jsx';

export default function App() {
  const [text, setText] = useState();
  const [open, setOpen] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Board />,
    },
    {
      path: "chooseplayer",
      element: <Menu />,
    },
    {
      path: "playboard",
      element: <h1>"playboard"</h1>,
    },
  ]);
  return (
    <>
      <DataContext.Provider value={{ text, setText, open, setOpen }}>
        <Board />
        <Popup />
      </DataContext.Provider>
      {/* <JoinGame /> */}
      {/* <Menu /> */}
      {/* <RouterProvider router={router} /> */}
      {/* <JoinGame/> */}

    </>
  )
}




