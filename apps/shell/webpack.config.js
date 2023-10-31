const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const dependencies = require("./package.json").dependencies;

module.exports = {
  output: {
    uniqueName: "shell",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        'mfeReact': 'mfeReact@http://localhost:4001/remoteEntry.js',
      },
      shared: {
        '@angular/common': {
          version: dependencies['@angular/common'],
          singleton: false,
          eager: true
        },
        '@angular/core': {
          version: dependencies['@angular/core'],
          requiredVersion: dependencies['@angular/core'],
          singleton: false,
          eager: true
        },
        '@angular/router': {
          version: dependencies['@angular/router'],
          requiredVersion: dependencies['@angular/router'],
          singleton: false,
          eager: true
        },
        'react': {
          version: dependencies['react'],
          requiredVersion: dependencies['react'],
          singleton: true,
          eager: true
        },
        'react-dom': {
          version: dependencies['react-dom'],
          requiredVersion: dependencies['react-dom'],
          singleton: true,
          eager: true
        },
      }
    })
  ]
}
