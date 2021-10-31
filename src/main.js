const { app, ipcMain } = require('electron');

function App() {
  require('./electron/CreateWindow.js');
}

app.whenReady().then(() => {
  App();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('sendQuit', () => {
  app.quit(); 
});