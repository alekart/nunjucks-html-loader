import { basename, join } from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import { sync as globSync } from 'glob';
// eslint-disable-next-line import/no-extraneous-dependencies
import { camelCase } from 'lodash';

import loadJsonData from './load-json-file';

export default function loadPartials(dataPath, loader, locale = '') {
  const localePath = locale ? `/${locale}/` : '';
  const globPath = join(dataPath, localePath, `_*.json`);
  return globSync(globPath).reduce((partials, filename) => {
    const varName = `_${  camelCase(basename(filename).replace(/^_/, '').replace('.json', ''))}`;
    loader.addDependency(filename);
    // eslint-disable-next-line no-param-reassign
    partials[varName] = loadJsonData(filename);
    return partials;
  }, {});
}
