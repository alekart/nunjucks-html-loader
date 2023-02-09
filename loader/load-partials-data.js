const path = require('path');
const glob = require('glob');
const {camelCase} = require('lodash/string');
const loadJsonData = require('./load-json-file');

function loadPartials(dataPath, loader, locale = '') {
  const localePath = locale ? `/${locale}/` : '';
  const globPath = path.join(dataPath, localePath, `_*.json`);
  return glob.sync(globPath).reduce((partials, filename) => {
    const varName = '_' + camelCase(path.basename(filename).replace(/^_/, '').replace('.json', ''));
    loader.addDependency(filename);
    partials[varName] = loadJsonData(filename);
    return partials;
  }, {});
}

module.exports = loadPartials;