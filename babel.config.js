module.exports = function (api) {
  api.cache(false);
  const presets = [
      [
          "@babel/preset-env",
          {
              "corejs": { "version": 3 },
              "useBuiltIns": "usage",
              "targets": {
                  "ie": "10"
              }
          }
      ]
  ];
  const plugins = [];
  return {
      presets,
      plugins
  };
};