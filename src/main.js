const { app, ipcMain } = require('electron');
const ioHook = require('iohook');
const Timer = require('./Timer');

let browsers = [];
let counter;
const minutesCounter = 10;

function CountDownToShowBrowsers() {
  showBrowsers();
}

function App() {
  browsers = require('./electron/CreateWindow.js');
  require('./electron/Tray.js');
  counter = new Timer(CountDownToShowBrowsers, 60 * 1000 * minutesCounter);
  counter.start();
}

app.whenReady().then(() => {
  app.allowRendererProcessReuse = false;
  registerIoHookEvents();
  ioHook.start(false);
  App();
});

app.setLoginItemSettings({
  openAtLogin: true
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  app.quitting = true;
})

function showBrowsers() {
  browsers.forEach(browser => {
    if(!browser.isVisible()) {
      browser.show();
    }
  });
}

function hideBrowsers() {
    browsers.forEach(browser => {
      browser.hide();
    });
    counter.reset();
}

ipcMain.on('sendHide', hideBrowsers);

function registerIoHookEvents() {

  ioHook.on('mousemove', (event) => {
    hideBrowsers();
  });

  ioHook.on('mouseclick', (event) => {
    hideBrowsers();
  });

  ioHook.on('mousewheel', (event) => {
    hideBrowsers();
  });

  ioHook.on('keydown', (event) => {
    hideBrowsers();
  });
}