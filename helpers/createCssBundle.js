const path = require('path');
const fs = require('fs/promises');

const { getFolderContent, groupFolderContent } = require('./fileSystem');
const readFile = require('./readFile');

const createCssBundle = async (cssFilesFolder, bundleDestPath) => {
  const folderContent = await getFolderContent(cssFilesFolder);
  const { files } = await groupFolderContent(folderContent);
  const cssFiles = files.filter((direntFile) => direntFile.name.endsWith('.css')).map((direntFile) => direntFile.name);
  const cssFilesContent = cssFiles.map(async (fileName) => await readFile(path.join(cssFilesFolder, fileName)));

  fs.writeFile(bundleDestPath, cssFilesContent, { encoding: 'utf8' });
};

module.exports = createCssBundle;
