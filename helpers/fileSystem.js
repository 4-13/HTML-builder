const { readdir, stat } = require('fs/promises');

const getFolderContent = (pathToFolder, options = {}) => {
  return readdir(pathToFolder, { withFileTypes: true, ...options });
};

const filterFolderContentDirentFiles = (folderContent) => {
  return folderContent.filter((item) => item.isFile());
};

const getFileInfo = async (pathToFIle) => {
  const info = await stat(pathToFIle);
  return info;
};

module.exports.getFolderContent = getFolderContent;
module.exports.filterFolderContentDirentFiles = filterFolderContentDirentFiles;
module.exports.getFileInfo = getFileInfo;
