const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'resources', 'index.js')
  },
  output: {
    path: path.resolve('../freeroam/', 'client_packages'),
    filename: 'index.js'
  },
  performance: {
    hints: false
  },
  module: {
    noParse: /nativeui/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: '@sucrase/webpack-loader',
            options: {
                transforms: ['imports']
            }
        }
      }
    ]
  }
};