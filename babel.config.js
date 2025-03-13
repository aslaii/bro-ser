module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets',
            '@app': './app',
            '@config': './app/config',
            '@components': './components',
            '@reducers': './app/reducers',
            '@services': './app/services',
            '@shared': './app/shared',
            '@locale': './locale',
            '~': './'
          }
        }
      ]
    ]
  };
};
