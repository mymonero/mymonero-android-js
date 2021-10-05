const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './local_modules/index.browser.js',
  output: {
    filename: 'mymonero-app-bundle.js',
    path: path.resolve(__dirname, 'browser_build')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process',
      Buffer: ['buffer', 'Buffer']
    }),
    new CopyPlugin({
      patterns: [
        { from: "node_modules/@mymonero/mymonero-app-bridge/MyMoneroLibAppCpp_WASM.js", to: "../browser_build/MoneroLibAppCpp_WASM.js" },
        { from: "node_modules/@mymonero/mymonero-app-bridge/MyMoneroLibAppCpp_WASM.wasm", to: "../browser_build/assets/MyMoneroLibAppCpp_WASM.wasm" },
        { from: 'local_modules', to: '../browser_build' },
      ]
    })
  ],
  resolve: {
    // alias: {
    //   process: 'process/browser'
    // },
    fallback: {
      fs: false,
      util: require.resolve('util'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      process: require.resolve('process/browser')
    }
  }
}
