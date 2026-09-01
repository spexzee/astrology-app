const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

let dbInstance = null;

function initDatabase(userDataPath) {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }

  const dbFilePath = path.join(userDataPath, 'astrology_demo.db');
  dbInstance = new Database(dbFilePath);

  // Enable WAL mode for high performance
  dbInstance.pragma('journal_mode = WAL');

  // Create table
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS birth_profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      gender TEXT,
      dateOfBirth TEXT NOT NULL,
      timeOfBirth TEXT NOT NULL,
      placeOfBirth TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      timezone REAL NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  return dbInstance;
}

function saveProfile(profile) {
  if (!dbInstance) throw new Error('Database not initialized');

  const now = new Date().toISOString();
  const id = profile.id || crypto.randomUUID();
  const createdAt = profile.createdAt || now;
  const updatedAt = now;

  const stmt = dbInstance.prepare(`
    INSERT INTO birth_profiles (
      id, name, gender, dateOfBirth, timeOfBirth, placeOfBirth,
      latitude, longitude, timezone, createdAt, updatedAt
    ) VALUES (
      @id, @name, @gender, @dateOfBirth, @timeOfBirth, @placeOfBirth,
      @latitude, @longitude, @timezone, @createdAt, @updatedAt
    )
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      gender = excluded.gender,
      dateOfBirth = excluded.dateOfBirth,
      timeOfBirth = excluded.timeOfBirth,
      placeOfBirth = excluded.placeOfBirth,
      latitude = excluded.latitude,
      longitude = excluded.longitude,
      timezone = excluded.timezone,
      updatedAt = excluded.updatedAt
  `);

  stmt.run({
    id,
    name: profile.name,
    gender: profile.gender || 'Prefer not to say',
    dateOfBirth: profile.dateOfBirth,
    timeOfBirth: profile.timeOfBirth,
    placeOfBirth: profile.placeOfBirth,
    latitude: profile.latitude,
    longitude: profile.longitude,
    timezone: profile.timezone,
    createdAt,
    updatedAt,
  });

  return getProfileById(id);
}

function getProfiles(query = '') {
  if (!dbInstance) throw new Error('Database not initialized');

  if (query && query.trim().length > 0) {
    const term = `%${query.trim()}%`;
    const stmt = dbInstance.prepare(`
      SELECT * FROM birth_profiles
      WHERE name LIKE ? OR placeOfBirth LIKE ?
      ORDER BY updatedAt DESC
    `);
    return stmt.all(term, term);
  }

  const stmt = dbInstance.prepare(`
    SELECT * FROM birth_profiles
    ORDER BY updatedAt DESC
  `);
  return stmt.all();
}

function getProfileById(id) {
  if (!dbInstance) throw new Error('Database not initialized');

  const stmt = dbInstance.prepare(`
    SELECT * FROM birth_profiles WHERE id = ?
  `);
  return stmt.get(id);
}

function deleteProfile(id) {
  if (!dbInstance) throw new Error('Database not initialized');

  const stmt = dbInstance.prepare(`
    DELETE FROM birth_profiles WHERE id = ?
  `);
  const info = stmt.run(id);
  return info.changes > 0;
}

module.exports = {
  initDatabase,
  saveProfile,
  getProfiles,
  getProfileById,
  deleteProfile,
};
