const { BrowserWindow, screen } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, '../', '../', 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  //win.webContents.openDevTools()

  win.loadFile('index.html')

  win.setMenu(null);

  win.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win
}

module.exports = createWindow();