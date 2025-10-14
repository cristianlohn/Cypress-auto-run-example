var path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      cypress: path.resolve(__dirname, 'cypress/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules\/(?!cypress-report-zephyr)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              allowTsInNodeModules: true,
            },
          },
        ],
      },
    ],
  },
};
