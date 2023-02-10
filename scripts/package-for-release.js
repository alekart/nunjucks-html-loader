const {writeFileSync} = require('fs');

const pckg = require('../package.json');

const take = [
  'name',
  'version',
  'description',
  'license',
  'publishConfig',
  'repository',
  'author',
  'homepage',
  'engines',
  'peerDependencies',
  'keywords',
];

const newPackage = take.reduce((accum, property) => {
  const value = pckg[property];
  if (value) {
    // eslint-disable-next-line no-param-reassign
    accum[property] = value;
  }
  return accum;
}, {});

writeFileSync('dist/package.json', `${JSON.stringify(newPackage, null, 2)}\n`, 'utf-8');
