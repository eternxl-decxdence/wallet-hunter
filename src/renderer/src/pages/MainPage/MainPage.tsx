import './MainPage.scss'
import TerminalComponent from '@renderer/components/TerminalComponent/TerminalComponent'
import { memo, useState } from 'react'
import StatsBlock from '@renderer/components/StatsBlock/StatsBlock'
import ConfigurationBlock from '@renderer/components/ConfigurationBlock/ConfigurationBlock'
import FoundBlock from '@renderer/components/FoundBlock/FoundBlock'

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
      <div className="data-wrapper">
        {/*Controll buttons TERMINAL - FARM*/}
        <MemoizedStatsBlock isStarted={isStarted} />
        <FoundBlock />
      </div>
      <div className="terminal-wrapper">
        {/* WELCOME PROMPT */}
        <ConfigurationBlock onStart={startGenerator} onStop={stopGenerator} isStarted={isStarted} />
        <MemoizedTerminal threads={maxThreads} isStarted={isStarted} />
      </div>
    </div>
  )
}
