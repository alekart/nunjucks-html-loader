const nunjucks = require('nunjucks');

/**
 * This is an extended version of the nunjucks file src
 */
const getNunjucksFileSystemLoader = (webpackLoader) => {
  return nunjucks.FileSystemLoader.extend({
    /**
     * @param name {string}
     * @returns {{path: *, noCache: *, demo: string}|null}
     */
    getSource: function getSource(name) {
      // Extend the source src method === super()
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