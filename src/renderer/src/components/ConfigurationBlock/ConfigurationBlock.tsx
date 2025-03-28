import { useState } from 'react'
import './ConfigurationBlock.scss'

export default function ConfigurationBlock({
  onStart,
  onStop,
  isStarted
}: {
  onStop: () => void
  onStart: (arg: number) => void
  isStarted: boolean
}) {
  const [maxThreads, setMaxThreads] = useState<number>(64)
  function buttonInterraction() {
    if (!isStarted) {
      Number.isNaN(maxThreads) && setMaxThreads(1)
      onStart(maxThreads)
    } else {
      onStop()
    }
  }
  return (
    <div className="config-block">
      <div className="config-title">Configuration</div>
      <div className="config-item">
        <div className="config-name">Max Generation Threads</div>
        <input
          name="maxThreads"
          type="number"
          className="config-value"
          value={maxThreads}
          placeholder="64"
          onChange={(e) => setMaxThreads(parseInt(e.target.value))}
        />
      </div>
      <button className="start-generator active" onClick={buttonInterraction}>
        Start Hunting
      </button>
    </div>
  )
}
