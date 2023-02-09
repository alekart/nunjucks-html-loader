const path = require('path');
const {merge} = require('lodash');
const loadData = require('./load-data');
const loadPartials = require('./load-partials-data');

function getData(loader, dataPath) {
  const options = loader.getOptions();
  const locale = options.locale;
  const templateName = path.basename(loader.resourcePath).replace(/\.\w+$/, '');
  return merge(
    // global data load
    loadData('global', dataPath, loader),
    locale ? loadData('global', dataPath, loader, locale) : {},
    // template data load
    loadData(templateName, dataPath, loader),
    locale ? loadData(templateName, dataPath, loader, locale) : {},
    // partials data load
    loadPartials(dataPath, loader),
    locale ? loadPartials(dataPath, loader, locale) : {},
  );
}

module.exports = getData;