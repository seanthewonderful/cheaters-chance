import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Profile from './components/Profile.jsx'
import Join from './components/Join.jsx'
import Game from './components/Game.jsx'
import Rules from './components/Rules.jsx'

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
