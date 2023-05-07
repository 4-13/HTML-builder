const path = require('path');

const { removeFolder, copyFolder, createFolder } = require('../helpers/fileSystem');

const sourceFolderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');

const solution = async () => {
  await removeFolder(copyFolderPath);
  await createFolder(copyFolderPath);
  copyFolder(sourceFolderPath, copyFolderPath);
};

solution();