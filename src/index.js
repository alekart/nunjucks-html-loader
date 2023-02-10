import { resolve } from 'path';

import { validate } from 'schema-utils';
import { getOptions } from 'loader-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import nunjucks from 'nunjucks';

import schema from './options.json';
import getNunjucksFileSystemLoader from './nunjucks-file-loader';
import getData from './utils/get-data';

export const raw = true;

export default function loader(source) {
  // const {version, webpack} = this;

  const options = getOptions(this) || {};

  validate(schema, options, 'Loader');

  const defaultSrcPath = 'src';
  const templatesPath = resolve(this.rootContext, options.templates || defaultSrcPath);
  const dataPath = resolve(this.rootContext, options.dataPath || `${defaultSrcPath}/data`);
  const data = {
    ...(options.data || {}),
    ...getData(this, dataPath),
  };

  const nunjucksOptions = {
    ...(options.nunjucks || {}),
    watch: false,
    noCache: true,
    web: {
      useCache: false,
      async: false,
    },
  };

  /**
   * @type {loaders.FileSystemLoader|FileSystemLoader}
   */
  const nunjucksFiles = new (getNunjucksFileSystemLoader(this))(templatesPath);
  const env = new nunjucks.Environment(nunjucksFiles, nunjucksOptions);

  return `${env.renderString(source, data)}`;
}
