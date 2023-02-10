import { basename } from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import { merge } from 'lodash';

import loadData from './load-data';
import loadPartials from './load-partials-data';

export default function getData(loader, dataPath) {
  const options = loader.getOptions();
  const {locale} = options;
  const templateName = basename(loader.resourcePath).replace(/\.\w+$/, '');
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
