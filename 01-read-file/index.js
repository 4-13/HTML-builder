const path = require('node:path');
const fs = require('node:fs');
const { colorSuccessMessage, colorErrorMessage } = require('../helpers/colorString');

const pathToFile = path.resolve(__dirname, './text.txt');

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


readFile(pathToFile, { encoding: 'utf-8' })
  .then((data) => console.log(colorSuccessMessage(data)))
  .catch((err) => console.log(colorErrorMessage(err)));




