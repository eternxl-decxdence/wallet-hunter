import './Header.scss'
import MinimizeSVG from '../../assets/minimize-btn.svg?react'
import CloseSVG from '../../assets/close-btn.svg?react'
import { ipcRenderer } from 'electron'

export default function Header() {
  function closeWindow() {
    window.electron.ipcRenderer.send('close-window')
  }
  function minimizeWindow() {
    window.electron.ipcRenderer.send('minimize-window')
  }
  return (
    <div className="header">
      <div className="title-bar">
        <p className="name">Wallet Hunter</p>
        <div className="control-buttons">
          <button className="window-control" onClick={minimizeWindow}>
            <MinimizeSVG className="minimize-btn" />
          </button>
          <button className="window-control" onClick={closeWindow}>
            <CloseSVG className="close-btn" />
          </button>
        </div>
      </div>
      <div className="smart-separator"></div>
    </div>
  )
}
