import { useState } from 'react'
import './ConfigurationBlock.scss'

export default function ConfigurationBlock({
  onStart,
  onStop,
  isStarted
}: {
  onStop: () => void
  onStart: (arg: number, arg2: number) => void
  isStarted: boolean
}) {
  const [maxThreads, setMaxThreads] = useState<number>(64)
  const [rpcBatchSize, setRpcBatchSize] = useState<number>(1000)
  function buttonInterraction() {
    if (!isStarted) {
      Number.isNaN(maxThreads) && setMaxThreads(1)
      onStart(maxThreads, rpcBatchSize)
    } else {
      onStop()
    }
  }
  return (
    <div className="config-block">
      <div className="config-label">
        <p className="config-title">Config</p>
      </div>
      <div className="config-wrapper">
        <div className="config-item">
          <div className="config-name">Max Generation Threads</div>
          <input
            name="maxThreads"
            type="number"
            className="config-value"
            value={maxThreads}
            placeholder="64"
            disabled={isStarted}
            onChange={(e) => setMaxThreads(parseInt(e.target.value))}
          />
        </div>
        <div className="config-item">
          <div className="config-name">Batch RPC Array Size</div>
          <input
            name="maxThreads"
            type="number"
            className="config-value"
            disabled={isStarted}
            value={rpcBatchSize}
            placeholder="1000"
            onChange={(e) => setRpcBatchSize(parseInt(e.target.value))}
          />
        </div>
      </div>
      <button tabIndex={-1} className={`start-generator`} onClick={buttonInterraction}>
        {!isStarted ? 'START HUNTING' : 'STOP HUNTING'}
      </button>
    </div>
  )
}
/* ${!isStarted ? 'active' : 'unactive'} */
