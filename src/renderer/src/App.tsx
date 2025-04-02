import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import MainPage from './pages/MainPage/MainPage'
import LoginPage from './pages/LoginPage/LoginPage'
import FancyBackground from './components/FancyBackground/FancyBackgorund'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import './App.css'

function App() {
  return (
    <div className="main-container">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<MainPage />} />
          </Route>
        </Routes>
      </Router>
      <FancyBackground />
    </div>
  )
}

export default App
