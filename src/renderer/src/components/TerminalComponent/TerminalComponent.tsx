import { useRef, useEffect, useState } from 'react'
import { Terminal } from '@xterm/xterm'
import './TerminalComponent.scss'
import { IpcRendererEvent } from 'electron'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

export default function TerminalComponent({
  isStarted,
  threads,
  batchSize
}: {
  batchSize: number
  threads: number
  isStarted: boolean
}) {
  const terminalRef = useRef<HTMLDivElement | null>(null)
  const termCols: number = 150
  const termRows: number = 47
  const terminal = useRef<Terminal | null>(
    new Terminal({
      cols: termCols,
      rows: termRows,
      theme: {
        background: '#13121D'
      },
      smoothScrollDuration: 200,
      fontFamily: "'JetBrains Mono', monospaced",
      fontSize: 12,
      letterSpacing: 0,
      disableStdin: true,
      cursorInactiveStyle: 'none',
      lineHeight: 1
    })
  )
  const isProcessRunning = useRef(false)
  const isSubscribed = useRef(false)
  const [isReceivingOutput, setReceivingOutput] = useState<boolean>(false)

  useEffect(() => {
    if (!terminalRef.current) {
      console.warn('❌ Terminal instance is missing! DOM not ready.')
      return
    }

    if (isStarted) {
      console.log('✅ Terminal starting...')

      if (!terminal.current) {
        console.log('⚡ Creating new Terminal instance...')
        terminal.current = new Terminal({
          cols: termCols,
          rows: termRows,
          theme: { background: '#13121d' },
          smoothScrollDuration: 200,
          fontFamily: "'JetBrains Mono', monospaced",
          fontSize: 12,
          letterSpacing: 0,
          lineHeight: 1,
          disableStdin: true,
          cursorInactiveStyle: 'none'
        })
      }

      if (terminalRef.current && terminal.current) {
        console.log('🎯 Opening terminal...')
        terminal.current.open(terminalRef.current)
      }

      console.log('Removing old IPC listeners...')
      window.electron.ipcRenderer.removeAllListeners('terminal-data')

      if (!isSubscribed.current) {
        console.log('Subscribing to terminal-data...')
        window.electron.ipcRenderer.on('terminal-data', handleData)
        isSubscribed.current = true
      }

      if (!isProcessRunning.current) {
        console.log('🚀 Sending start-csharp-process...')
        window.electron.ipcRenderer.send(
          'start-csharp-process',
          termCols,
          termRows,
          threads,
          batchSize
        )
        isProcessRunning.current = true
      }
    } else {
      console.log('🛑 Stopping terminal process...')
      window.electron.ipcRenderer.send('stop-csharp-process') // Отправляем сигнал на остановку
      isProcessRunning.current = false

      if (terminal.current) {
        terminal.current.clear()
        terminal.current.dispose()
        terminal.current = null
      }

      window.electron.ipcRenderer.removeAllListeners('terminal-data')
      isSubscribed.current = false
      setReceivingOutput(false)
    }

    return () => {
      console.log('♻ Cleaning up terminal...')
      window.electron.ipcRenderer.removeAllListeners('terminal-data')
      isSubscribed.current = false
      setReceivingOutput(false)
      if (terminal.current) {
        terminal.current.dispose()
        terminal.current = null
      }
    }
  }, [isStarted])
  function handleData(_: IpcRendererEvent, data: any) {
    if (!isReceivingOutput) {
      setReceivingOutput(true)
    }
    terminal.current?.write(data)
  }

  return (
    <div className="terminal-container">
      {isStarted && !isReceivingOutput && <LoadingSpinner />}

      <div className="font-loader">test</div>
      <div
        ref={terminalRef}
        style={{
          width: '948px',
          height: '624px',
          backgroundColor: 'rgba(from var(--tiles-background-color) r g b / 0.5)',
          opacity: 0.8
        }}
      />
    </div>
  )
}
