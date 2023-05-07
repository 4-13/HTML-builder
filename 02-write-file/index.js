
const { createWriteStream } = require('fs');
const { createInterface } = require('node:readline/promises');
const path = require('path');
const { stdin } = require('process');

const { colorErrorMessage, colorSuccessMessage, colorActionMessage } = require('../helpers/colorString');

const writeFilePath = path.join(__dirname, 'text.txt');

const consoleInputToFile = (writeFilePath) => {
  if (!writeFilePath) {
    throw new Error();
  }

  const writableStream = createWriteStream(writeFilePath);

  const exitHandler = async () => {
    writableStream.end();
    writableStream.on('finish', () => {
      console.log(colorSuccessMessage(`All your sentences have been written to ${writeFilePath}`));
    });
  };

  const rl = createInterface({
    input: stdin,
    output: writableStream,
  });

  console.log(colorActionMessage('Enter your sentences below: '));

  rl.on('line', (line) => {
    switch (line.trim()) {
    case 'exit':
      rl.close();
      break;
    default:
      writableStream.write(`${line}\n`);
      break;
    }
  })
    .on('error', error => {
      console.log(colorErrorMessage(`Error: ${error.message}`));
    })
    .on('close', () => {
      exitHandler();
    });

  process.on('SIGINT', () => {
    exitHandler().then(() => { process.exit(); });
  });
};

consoleInputToFile(writeFilePath);
