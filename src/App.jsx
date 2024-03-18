import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import Scuttlebutt from './components/pages/Scuttlebutt.jsx'
import Profile from './components/pages/Profile.jsx'
import Join, { getJoinableGames } from './components/pages/Join.jsx'
import Game from './components/pages/Game.jsx'
import Rules from './components/pages/Rules.jsx'
import Settings from './components/pages/Settings.jsx'
import NotFound from './components/pages/errors/NotFound.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route 
        path="/" 
        element={<Home />} 
        errorElement={<NotFound />}
      />
      <Route 
        path='/scuttlebutt' 
        element={<Scuttlebutt />} 
        errorElement={<NotFound />}
      >
        <Route 
          path="profile" 
          element={<Profile />} 
          errorElement={<NotFound />}
        />
        <Route 
          path="join" 
          element={<Join />} 
          loader={getJoinableGames}
          errorElement={<NotFound />}
        />
        <Route 
          path="game" 
          element={<Game />} 
          errorElement={<NotFound />}
        />
        <Route 
          path="rules" 
          element={<Rules />} 
          errorElement={<NotFound />}
        />
        <Route 
          path="settings" 
          element={<Settings />} 
          errorElement={<NotFound />}
        />
      </Route>
    </>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
