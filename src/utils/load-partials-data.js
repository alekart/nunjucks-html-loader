import { basename, join } from 'path';
import { sync as globSync } from 'glob';

import camelCase from './camel-case';
import loadJsonData from './load-json-file';

export default function loadPartials(dataPath, loader, locale = '') {
  const localePath = locale ? `/${locale}/` : '';
  const globPath = join(dataPath, localePath, `_*.json`);
  return globSync(globPath).reduce((partials, filename) => {
    const varName = `_${camelCase(basename(filename).replace(/^_/, '').replace('.json', ''))}`;
    loader.addDependency(filename);
    // eslint-disable-next-line no-param-reassign
    partials[varName] = loadJsonData(filename);
    return partials;
  }, {});
}
