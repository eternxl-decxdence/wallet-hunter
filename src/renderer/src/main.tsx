import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

// Use contextBridge
window.electron.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
