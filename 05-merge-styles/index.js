const path = require('path');
const createCssBundle = require('../helpers/createCssBundle');

const solution = async () => {
  const cssFilesFolder = path.join(__dirname, 'styles');
  const cssBundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

  createCssBundle(cssFilesFolder, cssBundlePath);
};

solution();
