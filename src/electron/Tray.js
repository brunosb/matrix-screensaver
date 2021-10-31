const { Tray } = require('electron')
const { resolve } = require('path')

const iconPath = resolve(__dirname, '../', '../', 'assets', 'matrix-icon.ico')

function createTray() {
  const tray = new Tray(iconPath)
  tray.setToolTip('Matrix')
  return tray
}

module.exports = createTray()