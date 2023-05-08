const fs = require('node:fs');

const readFile = async (filePath, options) => {
  return new Promise((res, rej) => {
    const readStream = fs.createReadStream(filePath, options);
    let result = '';

    readStream.on('data', (data) => {
      result += data;
    });

    readStream.on('end', () => {
      res(result);
    });

    readStream.on('error', (err) => {
      rej(err);
    });
  }
  );
};

module.exports = readFile;