const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const db = require('./db.cjs');

const isDev = !app.isPackaged;
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    title: 'Vedic Astrology Studio',
    backgroundColor: '#0d1117',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://127.0.0.1:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

// Initialize SQLite database in Electron user data directory
app.whenReady().then(() => {
  const userDataPath = app.getPath('userData');
  db.initDatabase(userDataPath);

  // Setup IPC Handlers
  ipcMain.handle('db:saveProfile', async (_event, profile) => {
    try {
      return { success: true, data: db.saveProfile(profile) };
    } catch (err) {
      console.error('Failed to save profile:', err);
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('db:getProfiles', async (_event, query) => {
    try {
      return { success: true, data: db.getProfiles(query) };
    } catch (err) {
      console.error('Failed to get profiles:', err);
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('db:getProfileById', async (_event, id) => {
    try {
      return { success: true, data: db.getProfileById(id) };
    } catch (err) {
      console.error('Failed to get profile:', err);
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('db:deleteProfile', async (_event, id) => {
    try {
      return { success: true, data: db.deleteProfile(id) };
    } catch (err) {
      console.error('Failed to delete profile:', err);
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('app:savePdfDialog', async (_event, { defaultName, pdfBase64 }) => {
    try {
      const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Save Astrology Report PDF',
        defaultPath: defaultName || 'Kundali_Report.pdf',
        filters: [{ name: 'PDF Documents', extensions: ['pdf'] }],
      });

      if (!result.canceled && result.filePath) {
        const buffer = Buffer.from(pdfBase64, 'base64');
        fs.writeFileSync(result.filePath, buffer);
        return { success: true, filePath: result.filePath };
      }
      return { success: false, canceled: true };
    } catch (err) {
      console.error('Failed to save PDF:', err);
      return { success: false, error: err.message };
    }
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});