const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { ProvidePlugin }  = require('webpack');
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
    new ProvidePlugin({
      "React": "react",
    }),
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
      }
    })
  ]
}
