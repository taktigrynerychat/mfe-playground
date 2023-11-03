const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const dependencies = require("./package.json").dependencies;

module.exports = {
  output: {
    uniqueName: "mfeAngular",
    publicPath: "auto",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfeAngular",
      filename: "remoteEntry.js",
      library: {type: "var", name: "mfeAngular"},
      exposes: {
        ExposedComponent: "./src/app/exposed/exposed.component",
        Counter: "./src/app/components/counter/counter.component",
      },
      shared: {
        '@angular/common': {
          version: dependencies['@angular/common'],
          requiredVersion: dependencies['@angular/common'],
          singleton: true,
        },
        '@angular/core': {
          version: dependencies['@angular/core'],
          requiredVersion: dependencies['@angular/core'],
          singleton: true,
        },
        '@angular/router': {
          version: dependencies['@angular/router'],
          requiredVersion: dependencies['@angular/router'],
          singleton: true,
        },
      }
    })
  ]
}
