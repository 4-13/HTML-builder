const path = require('path');
const fs = require('fs/promises');

const { getFolderContent, groupFolderContent } = require('../helpers/fileSystem');
const readFile = require('../helpers/readFile');

const solution = async () => {
  const cssFilesFolder = path.join(__dirname, 'styles');
  const cssBundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

  const folderContent = await getFolderContent(cssFilesFolder);
  const { files } = await groupFolderContent(folderContent);
  const cssFiles = files.filter((direntFile) => direntFile.name.endsWith('.css')).map((direntFile) => direntFile.name);
  const cssFilesContent = cssFiles.map(async (fileName) => await readFile(path.join(cssFilesFolder, fileName)));

  fs.writeFile(cssBundlePath, cssFilesContent, { encoding: 'utf8' });
};

solution();
