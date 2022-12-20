import React, { useState } from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from './components/Login';
import CreateAccount from './components/CreateAccount.jsx';
import './firebase/firebase.js'
import NewTask from './components/NewTask';
import AllTasks from './components/AllTasks';


const App = () => {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CreateAccount/" element={< CreateAccount />} />
          <Route path="/NewTask/" element={<NewTask />} />
          <Route path="/AllTasks/" element={<AllTasks />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App