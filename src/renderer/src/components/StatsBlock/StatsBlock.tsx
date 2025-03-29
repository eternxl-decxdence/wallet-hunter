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
      <p className="stat-title">Stats</p>
      <div className="stat-item">
        <p className="stat-name">Address average</p>
        <p className="stat-quantity">{parseFloat(statsData.avgAddresses) * 2} addr/sec</p>
      </div>
      <div className="stat-item">
        <p className="stat-name">Requests average</p>
        <p className="stat-quantity">{parseFloat(statsData.avgRequests) * 2} req/sec</p>
      </div>
      <div className="stat-item">
        <p className="stat-name">Total addresses</p>
        <p className="stat-quantity">{parseInt(statsData.addrGenerated) * 2} addr</p>
      </div>
      <div className="stat-item">
        <p className="stat-name">Total requests</p>
        <p className="stat-quantity">{parseInt(statsData.reqProcessed) * 2} req</p>
      </div>
      <div className="stat-item">
        <p className="stat-name">Uptime</p>
        <p className="stat-quantity">{formatUptime(uptime)}</p>
      </div>
      <div className="stat-item">
        <p className="stat-name">Subscription status</p>
        <p className="stat-quantity">0</p>
      </div>
    </div>
  )
}
