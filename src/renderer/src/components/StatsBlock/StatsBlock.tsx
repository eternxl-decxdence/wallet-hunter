import { useEffect, useState } from 'react'
import './StatsBlock.scss'
import { IpcRendererEvent } from 'electron'

export default function StatsBlock({ isStarted }: { isStarted: boolean }) {
  interface Stats {
    reqProcessed: string
    addrGenerated: string
    avgRequests: string
    avgAddresses: string
  }
  const [statsData, setStatsData] = useState<Stats>({
    reqProcessed: '0',
    addrGenerated: '0',
    avgRequests: '0',
    avgAddresses: '0'
  })
  const [uptime, setUptime] = useState<number>(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined
    if (isStarted) {
      setUptime(0) // Сбрасываем аптайм при новом старте
      interval = setInterval(() => {
        setUptime((prev) => prev + 1)
      }, 1000)
      window.electron.ipcRenderer.on('stats-data', handleStatsUpdate)
    } else {
      if (interval !== undefined) clearInterval(interval)
      window.electron.ipcRenderer.removeAllListeners('stats-data')
    }
  }, [isStarted])

  function handleStatsUpdate(_: IpcRendererEvent, data: any) {
    console.log(data)
    if (data === null) {
      setStatsData({
        reqProcessed: '0',
        addrGenerated: '0',
        avgRequests: '0',
        avgAddresses: '0'
      })
    } else {
      setStatsData(data)
    }
  }
  function formatUptime(seconds: number) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h}h ${m}m ${s}s`
  }

  return (
    <div className="stat-block">
      <div className="stat-label">
        <p className="stat-title">Stats</p>
      </div>
      <div className="stat-item">
        <p className="stat-text">AVG Addresses</p>
        <p className="stat-text">{parseFloat(statsData.avgAddresses) * 2.0} psec</p>
      </div>
      <div className="stat-item">
        <p className="stat-text">AVG Requests</p>
        <p className="stat-text">{parseFloat(statsData.avgRequests) * 2.0} psec</p>
      </div>
      <div className="stat-item">
        <p className="stat-text">Total addresses</p>
        <p className="stat-text">{parseInt(statsData.addrGenerated) * 2}</p>
      </div>
      <div className="stat-item">
        <p className="stat-text">Total requests</p>
        <p className="stat-text">{parseInt(statsData.reqProcessed) * 2}</p>
      </div>
      <div className="stat-item">
        <p className="stat-text">Uptime</p>
        <p className="stat-text">{formatUptime(uptime)}</p>
      </div>
      <div className="stat-item">
        <p className="stat-text">Subscription</p>
        <p className="stat-text">0</p>
      </div>
    </div>
  )
}
