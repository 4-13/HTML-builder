const path = require('node:path');
const fs = require('node:fs');

const pathToFile = path.resolve(__dirname, './text.txt');

const readFile = (filePath, options, cb) => {
  const readStream = fs.createReadStream(filePath, options);

  readStream.on('data', (data) => {
    cb(data);
  });
};

readFile(pathToFile, { encoding: 'utf-8' }, (chunk) => {
  console.log(chunk);
});
