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
import ChoiceSymbol from './components/choiceSymbol/index.jsx';
import { SocketProvider } from './socket.jsx';

export default function App() {
  const [text, setText] = useState();
  const [open, setOpen] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "menu",
      element: <Menu />,
    },
    {
      path: "joinGame",
      element: <JoinGame />,
    },
    {
      path: "playboard",
      element: <Board/>
    },
  ]);




  return (
    <>
      <SocketProvider>

        <DataContext.Provider value={{ text, setText, open, setOpen }}>
          {/* <Board /> */}
      <RouterProvider router={router} />
        <Popup />
          {/* <ChoiceSymbol /> */}
        </DataContext.Provider>
      </SocketProvider>

      {/* <JoinGame /> */}
      {/* <Menu /> */}
      {/* <JoinGame/> */}

    </>
  )
}




