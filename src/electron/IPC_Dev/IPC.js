const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const {ipcMain} = require('electron');
const notifier = require('node-notifier');

const WindowsToaster = require('node-notifier').WindowsToaster;

import language from '../Language/language.js';

ipcMain.on('CourseResultNotification', (event, ResultCourse) => {
  notifier.notify({
  'title': 'My notification',
  'message': 'Hello, there!'
});
  console.log('ipc process received!')
  let NotificationMessageTitle = `${ResultCourse.subject} ${ResultCourse.catalog_number}: ${ResultCourse.title}`;
  let NotificationMessageBody = ResultCourse.description;
  console.log(NotificationMessageTitle);
  console.log(NotificationMessageBody);
  notifier.notify({
    title: NotificationMessageTitle,
    message: NotificationMessageBody,
    icon: path.join(__dirname, '\\src\\assets\\img\\uw-notification.jpg'), // Absolute path (doesn't work on balloons)
    sound: true, // Only Notification Center or Windows Toasters
    wait: true, // Wait with callback, until user action is taken against notification
    reply: false // Boolean. If notification should take input. Value passed as third argument in callback and event emitter.
  }, function(error, response) {
      console.log(error)
      console.log(response)
  });

})

ipcMain.on('OpenRateMyProfessor', (event, profName) => {
  console.log('rateMyProf received!');
  console.log(profName);
  const firstName = profName.split(',')[0];
  const lastName = profName.split(',')[1];
  var rateMyProf = new BrowserWindow({width: 800, height: 600, resizable: true, frame: true});
  rateMyProf.setMenu(null);
  rateMyProf.loadURL(`http://www.ratemyprofessors.com/search.jsp?query=${lastName}+${firstName}`)

  rateMyProf.on('closed', () => {
    rateMyProf = null;
  });
});

ipcMain.on('SetLanguage', (event, lang) => {
  console.log(`SetLanguage Received: ${lang}`);
  language.saveLanguage(lang);
});

ipcMain.on('LoadLanguage', (event) =>{
  console.log('loadLanguage Received');
  const lang = language.loadLanguage();
  event.sender.send('LoadLanguage-reply', lang);
});
