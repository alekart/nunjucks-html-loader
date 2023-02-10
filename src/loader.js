const nunjucks = require('nunjucks');
const path = require('path');
const getNunjucksFileSystemLoader = require('./nunjucks-file-loader');
const getData = require('./get-data');

module.exports = function (source) {
  const options = this.getOptions();
  const defaultSrcPath = 'src';
  const templatesPath = path.resolve(this.rootContext, options.templates || defaultSrcPath);
  const dataPath = path.resolve(this.rootContext, options.dataPath || `${defaultSrcPath}/data`);
  const data = {
    ...(options.data || {}),
    ...getData(this, dataPath),
  };

  const nunjucksOptions = {
    autoescape: true, // controls if output with dangerous characters are escaped automatically. See Autoescaping
    throwOnUndefined: false, // throw errors when outputting a null/undefined value
    trimBlocks: false, // automatically remove trailing newlines from a block/tag
    lstripBlocks: false, // automatically remove leading whitespace from a block/tag
    ...(options.nunjucks || {}),
    watch: false,
    noCache: true,
    web: { // an object for configuring loading templates in the browser:
      useCache: false, // will enable cache and templates will never see updates.
      async: false, // will load templates asynchronously instead of synchronously (requires use of the asynchronous API for rendering).
    },
  };

  /**
   * @type {loaders.FileSystemLoader|FileSystemLoader}
   */
  const nunjucksFiles = new (getNunjucksFileSystemLoader(this))(templatesPath);
  const env = new nunjucks.Environment(nunjucksFiles, nunjucksOptions);
  return env.renderString(source, data);
};