module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@app': './src/app',
          '@assets': './src/assets',
          '@components': './src/components',
          '@features': './src/features',
          '@domain': './src/domain',
          '@data': './src/data',
          '@shared': './src/shared',
          '@store': './src/store',
          '@tests': './src/tests',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
