const MIN_BABEL_VERSION = 7;
const nodeVersion = '16.19.0';

module.exports = (api) => {
  api.assertVersion(MIN_BABEL_VERSION);
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: nodeVersion,
          },
        },
      ],
    ],
  };
};
