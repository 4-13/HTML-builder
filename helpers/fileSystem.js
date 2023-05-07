const { readdir, stat, mkdir, rm, copyFile } = require('fs/promises');
const path = require('path');

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

const createFolder = (path, options = {}) => {
  return mkdir(path, { recursive: true, ...options });
};

const removeFolder = (path, options = {}) => {
  return rm(path, { force: true, recursive: true, ...options });
};

const copy = (src, dest, mode = 0) => {
  return copyFile(src, dest, mode);
};

const copyFolder = async (src, dest) => {
  const folderContent = await getFolderContent(src);
  folderContent.forEach((item) => {
    if (item.isFile()) {
      copy(path.join(src, item.name), path.join(dest, item.name));
    } else if (item.isDirectory()) {
      createFolder(path.join(dest, item.name));
      copyFolder(path.join(src, item.name), path.join(dest, item.name));
    }
  });
};


module.exports.getFolderContent = getFolderContent;
module.exports.groupFolderContent = groupFolderContent;
module.exports.getFileInfo = getFileInfo;
module.exports.copyFile = copyFile;
module.exports.createFolder = createFolder;
module.exports.copyFolder = copyFolder;
module.exports.removeFolder = removeFolder;

