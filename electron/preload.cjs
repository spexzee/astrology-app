const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  appVersion: '1.0.0',
  db: {
    saveProfile: (profile) => ipcRenderer.invoke('db:saveProfile', profile),
    getProfiles: (query) => ipcRenderer.invoke('db:getProfiles', query),
    getProfileById: (id) => ipcRenderer.invoke('db:getProfileById', id),
    deleteProfile: (id) => ipcRenderer.invoke('db:deleteProfile', id),
  },
  dialog: {
    savePdf: (options) => ipcRenderer.invoke('app:savePdfDialog', options),
  },
});