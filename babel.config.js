module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@store': './src/store',
          '@theme': './src/theme',
          '@typings': './src/types',
          '@utils': './src/utils',
          '@services': './src/services',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
