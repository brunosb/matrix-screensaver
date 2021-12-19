const { app, ipcMain, Menu } = require('electron');
const ioHook = require('iohook');
const Timer = require('./Timer');

let browsers = [];
let counter;
let minutesCounter = 10;
let activeProgram = true;

function App() {
  const tray = require('./electron/Tray.js');
  browsers = require('./electron/CreateWindow.js');

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Ligado',
      type: 'checkbox',
      checked: activeProgram, 
      click: () => {
        activeProgram = !activeProgram;
      }
    },
    {
      label: 'Intervalo',
      submenu: [
        {
          label: '5 minutos',
          type: 'radio',
          checked: minutesCounter === 5,
          click: () => {
            minutesCounter = 5;
          }
        },
        {
          label: '10 minutos',
          type: 'radio',
          checked: minutesCounter === 10,
          click: () => {
            minutesCounter = 10;
          }
        },
        {
          label: '30 minutos',
          type: 'radio',
          checked: minutesCounter === 30,
          click: () => {
            minutesCounter = 30;
          }
        },
        {
          label: '1 hora',
          type: 'radio',
          checked: minutesCounter === 60,
          click: () => {
            minutesCounter = 60;
          }
        }
      ]
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
  tray.on('click', () => {
    if(activeProgram) {
      showBrowsers();
    }
  });

  counter = new Timer(showBrowsers, 60 * 1000 * minutesCounter);
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
      if(browser.isVisible()) {
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
    if(event.button === 1) {
      hideBrowsers();
    }
  });

  ioHook.on('mousewheel', (event) => {
    hideBrowsers();
  });

  ioHook.on('keydown', (event) => {
    hideBrowsers();
  });
}