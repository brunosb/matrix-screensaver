const { BrowserWindow, screen } = require('electron')
const path = require('path')

function createWindow () {
  let browsers = [];
  const displays = screen.getAllDisplays()

  displays.forEach((display) => {
    const win = new BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      fullscreen: true,
      resizable: true,
      webPreferences: {
        preload: path.join(__dirname, '../', '../', 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false
      }
    })
  
    //win.webContents.openDevTools()
  
    win.loadFile('index.html')
    win.setAlwaysOnTop(true, 'screen-saver')
    win.setVisibleOnAllWorkspaces(true)
    win.maximize()
    win.setMenu(null)
  
    win.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    });
  
    browsers.push(win);
  });  

  return browsers;
}

module.exports = createWindow();