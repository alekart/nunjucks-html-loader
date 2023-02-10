const fs = require('fs');

/**
 * @param filePath {string}
 * @returns {{}}
 */
function loadJsonData(filePath) {
  let fileContent;
  try {
    fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    fileContent = {};
  }
  return fileContent;
}

module.exports = loadJsonData;