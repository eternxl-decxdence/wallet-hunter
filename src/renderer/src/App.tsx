import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import MainPage from './pages/MainPage/MainPage'
import LoginPage from './pages/LoginPage/LoginPage'
import FarmPage from './pages/FarmPage/FarmPage'
import FancyBackground from './components/FancyBackground/FancyBackgorund'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import './App.css'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState<string>('')

  return (
    <div className="main-container">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage user={user} setUser={setUser} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<MainPage user={user} />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/farm" element={<FarmPage />} />
          </Route>
        </Routes>
      </Router>
      <FancyBackground />
    </div>
  )
}

export default App
