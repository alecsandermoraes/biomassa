const { app, BrowserWindow } = require('electron');
let mainWindow; 

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL(`file://${__dirname}/pages/dashboard.html`);
});

