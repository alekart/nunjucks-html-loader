const path = require('path');
const loadJsonData = require('./load-json-file');

function loadData(file, dataPath, loader, locale) {
  const localePath = locale ? `/${locale}/` : '';
  const filePath = path.join(dataPath, localePath,  `${file}.json`);
  loader.addDependency(filePath);
  return loadJsonData(filePath);
}
module.exports = loadData;