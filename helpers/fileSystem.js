const { readdir, stat } = require('fs/promises');

const getFolderContent = (pathToFolder, options = {}) => {
  return readdir(pathToFolder, { withFileTypes: true, ...options });
};

const groupFolderContent = (folderContent) => {
  return folderContent.reduce((acc, item) => {
    if (item.isFile()) {
      acc.files.push(item);
    }
    else if (item.isDirectory()) {
      acc.directories.push(item);
    }


    return acc;
  }, { files: [], directories: [] });
};

const getFileInfo = async (pathToFIle) => {
  const info = await stat(pathToFIle);
  return info;
};

module.exports.getFolderContent = getFolderContent;
module.exports.groupFolderContent = groupFolderContent;
module.exports.getFileInfo = getFileInfo;
