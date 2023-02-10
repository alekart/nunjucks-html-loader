const nunjucks = require('nunjucks');

/**
 * This is an extended version of the nunjucks file loader
 */
const getNunjucksFileSystemLoader = (webpackLoader) => {
  return nunjucks.FileSystemLoader.extend({
    /**
     * @param name {string}
     * @returns {{path: *, noCache: *, src: string}|null}
     */
    getSource: function getSource(name) {
      // Extend the source loader method === super()
      const result = nunjucks.FileSystemLoader.prototype.getSource.call(this, name);
      if (!result) {
        return null;
      }

      const depPath = result.path;
      webpackLoader.addDependency(depPath);
      return result;
    },
  });
}

module.exports = getNunjucksFileSystemLoader;