module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'packagejson',
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@utils': './src/utils',
          '@i18n': './src/i18n',
          '@hooks': './src/hooks',
          '@data': './src/data',
          '@assets': './src/assets',
          '@app': './src/app',
          '@src': './src',
          '@root': './',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
