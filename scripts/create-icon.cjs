const fs = require('fs');
const path = require('path');

// Read the PNG logo
const pngPath = path.join(__dirname, '../src/assets/logo.png');
const pngBuffer = fs.readFileSync(pngPath);

// Create a valid Windows ICO file embedding the PNG directly
// Header: 2 bytes reserved (0), 2 bytes type (1 = ICO), 2 bytes image count (1)
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // 1 = ICO
header.writeUInt16LE(1, 4); // 1 image

// Directory Entry: 16 bytes
const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(0, 0); // width: 0 means 256px
dirEntry.writeUInt8(0, 1); // height: 0 means 256px
dirEntry.writeUInt8(0, 2); // color count
dirEntry.writeUInt8(0, 3); // reserved
dirEntry.writeUInt16LE(1, 4); // color planes
dirEntry.writeUInt16LE(32, 6); // bits per pixel
dirEntry.writeUInt32LE(pngBuffer.length, 8); // size of image data
dirEntry.writeUInt32LE(22, 12); // offset (6 header + 16 entry = 22)

const icoBuffer = Buffer.concat([header, dirEntry, pngBuffer]);

// Write icon.ico to src/assets and build
fs.writeFileSync(path.join(__dirname, '../src/assets/icon.ico'), icoBuffer);

const buildDir = path.join(__dirname, '../build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}
fs.writeFileSync(path.join(buildDir, 'icon.ico'), icoBuffer);
fs.writeFileSync(path.join(buildDir, 'icon.png'), pngBuffer);

console.log('Icon generated successfully!');
