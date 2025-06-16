// File: babel.config.js

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Add the module-resolver plugin configuration here
      [
        'module-resolver',
        {
          root: ['./'], // The project root directory
          alias: {
            // This creates the '~' shortcut to point to your 'src' folder
            '~': './src',
          },
        },
      ],
      // IMPORTANT: If you use react-native-reanimated, its plugin must be listed last.
      'react-native-reanimated/plugin',
    ],
  };
};