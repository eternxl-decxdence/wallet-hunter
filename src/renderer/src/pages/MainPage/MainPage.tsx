import './MainPage.scss'
import TerminalComponent from '../../components/TerminalComponent/TerminalComponent'
import { memo, useState } from 'react'
import StatsBlock from '../../components/StatsBlock/StatsBlock'
import ConfigurationBlock from '../../components/ConfigurationBlock/ConfigurationBlock'

export default function MainPage() {
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [maxThreads, setMaxThreads] = useState<number>(64)
  const MemoizedTerminal = memo(TerminalComponent)

  const MemoizedStatsBlock = memo(StatsBlock)

  function startGenerator(threads: number) {
    setMaxThreads(threads)
    setIsStarted(true)
  }
  function stopGenerator() {
    setIsStarted(false)
  }

  return (
    <div className="main-page">
      <div className="results-wrapper">
        <MemoizedStatsBlock isStarted={isStarted} />
        <ConfigurationBlock onStart={startGenerator} onStop={stopGenerator} isStarted={isStarted} />
      </div>
      <MemoizedTerminal threads={maxThreads} isStarted={isStarted} />
    </div>
  )
}
