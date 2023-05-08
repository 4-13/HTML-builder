const path = require('path');

const { createFolder, removeFolder, copyFolder } = require('../helpers/fileSystem');
const createCssBundle = require('../helpers/createCssBundle');
const readFile = require('../helpers/readFile');
const { access } = require('fs/promises');
const { createWriteStream } = require('fs');

const solution = async () => {
  const projectFolderPath = path.join(__dirname, 'project-dist');
  const cssSrcFolder = path.join(__dirname, 'styles');
  const cssBundlePath = path.join(projectFolderPath, 'style.css');
  const assetsSrcPath = path.join(__dirname, 'assets');
  const assetsDestPath = path.join(projectFolderPath, 'assets');
  const htmlComponentsFolderPath = path.join(__dirname, 'components');
  const htmlFilePath = path.join(projectFolderPath, 'index.html');

  await removeFolder(projectFolderPath);
  await createFolder(projectFolderPath);
  createCssBundle(cssSrcFolder, cssBundlePath);
  copyFolder(assetsSrcPath, assetsDestPath);

  const htmlTemplate = await readFile(path.join(__dirname, 'template.html'));
  const templateParts = htmlTemplate.split(/({{.*}})/);

  const replacer = async (componentPath) => {
    try {
      await access(componentPath);
      const componentContent = await readFile(componentPath);
      return componentContent;
    } catch (e) {
      return '';
    }
  };

  const templatePartsPromises = templateParts.map(async (part) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const componentName = part.slice(2, -2);
      const componentPath = path.join(htmlComponentsFolderPath, `${componentName}.html`);
      return replacer(componentPath);
    }
    else {
      return Promise.resolve(part);
    }
  });

  const updatedTemplateStr = await Promise.all(templatePartsPromises).then(data => data.join('\r'));

  const writableStream = createWriteStream(htmlFilePath);
  writableStream.write(updatedTemplateStr);
  writableStream.end();
};

solution();
