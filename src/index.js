import { resolve } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import nunjucks from 'nunjucks';

import schema from './schema.json';
import getNunjucksFileSystemLoader from './nunjucks-file-loader';
import getData from './utils/get-data';

export const raw = false;

export default function loader(source) {
  const options = this.getOptions(schema) || {};
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
  addToEnvFromOptions(options, env);

  return env.renderString(source, data);
}

/**
 * @param options {Record<string, any>}
 * @param env {Environment}
 */
function addToEnvFromOptions(options, env) {
  const {globals, extensions, filters} = options;
  Object.keys(globals || {}).forEach((name) => {
    addToEnv('global', name, globals[name], env);
  });
  Object.keys(extensions || {}).forEach((name) => {
    addToEnv('extension', name, globals[name], env);
  });
  Object.keys(filters || {}).forEach((name) => {
    addToEnv('filter', name, globals[name], env);
  });
}

/**
 * @param type {"global"|"extension"|"filter"}
 * @param name {string}
 * @param fn {Function}
 * @param env {Environment}
 */
function addToEnv(type, name, fn, env) {
  // eslint-disable-next-line default-case
  switch (type) {
    case 'global':
      env.addGlobal(name, fn);
      break;
    case 'extension':
      env.addExtension(name, fn);
      break;
    case 'filter':
      env.addFilter(name, fn);
      break;
  }
}
