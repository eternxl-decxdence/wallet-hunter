import './MainPage.scss'

import { memo, useState } from 'react'
import StatsBlock from '@renderer/components/StatsBlock/StatsBlock'
import ConfigurationBlock from '@renderer/components/ConfigurationBlock/ConfigurationBlock'
import FoundBlock from '@renderer/components/FoundBlock/FoundBlock'
import TerminalComponent from '@renderer/components/TerminalComponent/TerminalComponent'
import ControlButtons from '@renderer/components/ControlButtons/ControlButtons'
import { CurrentPage } from '@renderer/interfaces/CurrentPage'
import WelcomeBar from '@renderer/components/WelcomeBar/WelcomeBar'

export default function MainPage({ user }: { user: string }) {
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [maxThreads, setMaxThreads] = useState<number>(64)
  const [rpcBatchSize, setRpcBatchSize] = useState<number>(1000)

  const MemoizedTerminal = memo(TerminalComponent)

  const MemoizedStatsBlock = memo(StatsBlock)

  function startGenerator(threads: number, batchSize: number) {
    setMaxThreads(threads)
    setRpcBatchSize(batchSize)
    setIsStarted(true)
  }
  function stopGenerator() {
    setIsStarted(false)
  }

  return (
    <div className="main-page">
      <div className="data-wrapper">
        <ControlButtons activePage={CurrentPage.Terminal} />
        <MemoizedStatsBlock isStarted={isStarted} />
        <FoundBlock />
      </div>
      <div className="terminal-wrapper">
        <WelcomeBar user={user} />
        <ConfigurationBlock onStart={startGenerator} onStop={stopGenerator} isStarted={isStarted} />
        <MemoizedTerminal threads={maxThreads} batchSize={rpcBatchSize} isStarted={isStarted} />
      </div>
    </div>
  )
}
