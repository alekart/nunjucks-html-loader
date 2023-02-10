import { join } from 'path';

import loadJsonData from './load-json-file';

export default function loadData(file, dataPath, loader, locale) {
  const localePath = locale ? `/${locale}/` : '';
  const filePath = join(dataPath, localePath, `${file}.json`);
  loader.addDependency(filePath);
  return loadJsonData(filePath);
}
