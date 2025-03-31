import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { spawn, IPty } from 'node-pty'
import { createConnection } from 'net'

const PIPE_NAME = '\\\\.\\pipe\\AuxDataPipe'
let pipeClient
let terminal: IPty | null

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    resizable: false,
    titleBarStyle: 'hidden',
    maximizable: false,
    fullscreenable: false,
    fullscreen: false,
    show: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  ipcMain.on('close-window', () => {
    mainWindow.close()
  })
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize()
  })
  ipcMain.on('start-csharp-process', (e, cols, rows, threads) => {
    console.log('Spawning terminal at', e)
    terminal = spawn(
      `${__dirname}\\../../resources/hunter-protocol.exe`,
      [
        '--adminUrl=http://localhost:5000',
        '--resultsFile=results.json',
        '--rpcUrl=https://ethereum-rpc.publicnode.com',
        `--maxThreads=${threads}`,
        '--localPort=5001'
      ],
      {
        name: 'xterm-256-color',
        cols,
        rows,
        cwd: __dirname
      }
    )
    connectToPipe()
    terminal.onData((data: string) => {
      mainWindow.webContents.send('terminal-data', data)
    })
    terminal.onExit(() => {
      terminal = null
    })
  })
  ipcMain.on('stop-csharp-process', () => {
    if (!terminal) return
    terminal?.kill()
    terminal = null
  })

  function connectToPipe(retries = 20) {
    pipeClient = createConnection(PIPE_NAME, () => {})

    pipeClient.on('readable', () => {
      setImmediate(() => {
        let chunk
        while (null !== (chunk = pipeClient.read())) {
          const data = chunk.toString().trim()
          console.log(`[PIPE] Received chunk:`, data)

          if (!data) {
            console.log('[PIPE] Empty data received, skipping...')
            continue // Пропускаем пустые данные
          }

          try {
            const JSON_DATA = JSON.parse(data)
            console.log(`[PIPE] Parsed JSON:`, JSON_DATA)
            mainWindow.webContents.send('stats-data', JSON_DATA)
          } catch (e) {
            console.error(`[PIPE] JSON Parse Error:`, e)
          }
        }
      })
    })

    pipeClient.on('error', (err: any) => {
      if (retries > 0) {
        console.log('Conection error, retrying... ', err)
        setTimeout(() => connectToPipe(retries - 1), 1000)
      } else {
      }
    })

    pipeClient.on('end', () => {
      console.log('Pipe connection closed')
    })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    terminal?.kill()
    terminal = null
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
