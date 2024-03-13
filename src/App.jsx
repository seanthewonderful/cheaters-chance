import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import Profile from './components/pages/Profile.jsx'
import Join from './components/pages/Join.jsx'
import Game from './components/pages/Game.jsx'
import Rules from './components/pages/Rules.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/join" element={<Join />} />
      <Route path="/game" element={<Game />} />
      <Route path="/rules" element={<Rules />} />
    </>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
