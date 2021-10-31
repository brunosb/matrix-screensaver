const { BrowserWindow, screen, app } = require('electron')
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
      closable: true,
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

    win.on('close', (event) => {
      if(app.quitting) {
        win = null;
      } else {
        event.preventDefault();
        win.hide();
      }
    });
  
    browsers.push(win);
  });  

  return browsers;
}

module.exports = createWindow();