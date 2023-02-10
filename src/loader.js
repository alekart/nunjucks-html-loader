import nunjucksToHtml from './loader-runtime.js';

module.exports = function (source) {
  console.log('NUNJUCKS');
  return `${nunjucksToHtml(source, this)}`;
};