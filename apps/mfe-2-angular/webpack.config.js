const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

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
      exposes: {
        Counter: "./src/app/components/counter/counter.component",
        PubSubFeature: "./src/app/components/pub-sub-feature/pub-sub-feature.component",
      },
      shared: {
        '@angular/common': {
          singleton: true,
          eager: true,
        },
        '@angular/core': {
          singleton: true,
          eager: true,
        },
        '@angular/router': {
          singleton: true,
          eager: true,
        },
      }
    })
  ]
}
