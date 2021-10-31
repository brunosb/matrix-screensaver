const { app, ipcMain, Menu } = require('electron');
const ioHook = require('iohook');
const Timer = require('./Timer');

let browsers = [];
let counter;
const minutesCounter = 10;
let activeProgram = true;

function CountDownToShowBrowsers() {
  showBrowsers();
}

function App() {
  browsers = require('./electron/CreateWindow.js');
  const Tray = require('./electron/Tray.js');

  Tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Ligado',
      type: 'checkbox',
      checked: activeProgram, 
      click: () => {
        activeProgram = !activeProgram;
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Sair',
      click: () => {
        app.quit();
      }
    }
  ]));
  Tray.setToolTip('Matrix ScreenSaver - Bruno Barbosa');
  Tray.setIgnoreDoubleClickEvents(true);

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
  ioHook.removeAllListeners();
  ioHook.unload();
  ioHook.stop();
  app.quitting = true;
})

function showBrowsers() {
  if (activeProgram) {   
    browsers.forEach(browser => {
      if(!browser.isVisible()) {
        browser.show();
      }
    });
  }
}

function hideBrowsers() {
    browsers.forEach(browser => {
      if(browser) {
        browser.hide();
      }
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