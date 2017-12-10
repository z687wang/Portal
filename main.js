const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const {ipcMain} = require('electron')
const {Tray} = require('electron')
const notifier = require('node-notifier');

const WindowsToaster = require('node-notifier').WindowsToaster;

require('./src/electron/IPC/IPC.js');
// var notifier = new WindowsToaster({
//   withFallback: false, // Fallback to Growl or Balloons?
//   customPath: void 0 // Relative/Absolute path if you want to use your fork of SnoreToast.exe
// });



notifier.on('click', function (notifierObject, options) {
  // Triggers if `wait: true` and user clicks notification
});

notifier.on('timeout', function (notifierObject, options) {
  // Triggers if `wait: true` and notification closes
});

import {enableLiveReload} from 'electron-compile';

enableLiveReload();

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, resizable: false, frame: true})
  win.setMenu(null);

  win.loadURL(url.format({
    pathname: path.join(__dirname, '/dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()


  win.on('closed', () => {
    win = null
  })
}


app.on('ready', createWindow)


app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
