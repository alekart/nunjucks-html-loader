import { readFileSync } from 'fs';

/**
 * @param filePath {string}
 * @returns {{}}
 */
export default function loadJsonData(filePath) {
  let fileContent;
  try {
    fileContent = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (e) {
    fileContent = {};
  }
  return fileContent;
}
