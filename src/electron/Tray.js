const { Tray } = require('electron')
const { resolve } = require('path')

const iconPath = resolve(__dirname, '../', '../', 'assets', 'matrix-icon-tray.ico')

function createTray() {
  const tray = new Tray(iconPath)
  tray.setToolTip('Matrix ScreenSaver - github.com/brunosb')
  return tray
}

module.exports = createTray()