const path = require('path');
const packageJson = require('./package.json');

// variables
const outPath = path.join(__dirname, './build');
const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './main.tsx',
  output: {
    path: outPath,
    publicPath: 'auto',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      },
      meta: {
        title: packageJson.name,
        description: packageJson.description,
        keywords: Array.isArray(packageJson.keywords) ? packageJson.keywords.join(',') : undefined
      }
    }),
  ],
  devServer: {
    open: true,
    port: 4001
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? 'hidden-source-map' : 'eval-source-map'
};