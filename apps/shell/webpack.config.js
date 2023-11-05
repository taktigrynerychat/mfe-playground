const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

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
        mfeReact: 'mfeReact@http://localhost:4001/remoteEntry.js',
        mfeAngular: 'mfeAngular@http://localhost:4002/remoteEntry.js',
      },
      shared: {
        '@angular/common': {
          singleton: false,
          eager: true,
        },
        '@angular/core': {
          singleton: false,
          eager: true,
        },
        '@angular/router': {
          singleton: false,
          eager: true,
        },
        'react': {
          singleton: true,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          eager: true,
        },
      }
    })
  ]
}
