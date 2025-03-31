import Header from './components/Header/Header'
import MainPage from './pages/MainPage/MainPage'
import LoginPage from './pages/LoginPage/LoginPage'
import FancyBackground from './components/FancyBackground/FancyBackgorund'
import './App.css'

function App() {
  return (
    <div className="main-container">
      <Header />
      <LoginPage />
      <FancyBackground />
    </div>
  )
}

export default App
