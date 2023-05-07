const path = require('path');

const formatBytes = require('../helpers/formatBytes');
const { getFileInfo, getFolderContent, groupFolderContent } = require('../helpers/fileSystem');

const solution = async () => {
  const pathToFolder = path.join(__dirname, 'secret-folder');
  const folderContent = await getFolderContent(pathToFolder);
  const { files } = await groupFolderContent(folderContent);

  const filesInfo = await Promise.all(files.map(async ({ name: direntName }) => {
    const filePath = path.join(pathToFolder, direntName);
    const { size } = await getFileInfo(filePath);
    const { name, ext } = path.parse(direntName);
    return { name, ext: ext.slice(1), size: formatBytes(size) };
  }));

  console.table(filesInfo);
  return filesInfo;
};

solution();