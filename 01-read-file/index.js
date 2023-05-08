const path = require('node:path');

const { colorSuccessMessage, colorErrorMessage } = require('../helpers/colorString');
const readFile = require('../helpers/readFile');

const pathToFile = path.resolve(__dirname, './text.txt');

readFile(pathToFile, { encoding: 'utf-8' })
  .then((data) => console.log(colorSuccessMessage(data)))
  .catch((err) => console.log(colorErrorMessage(err)));




