const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/src/js/index.js', // Ensure this path is correct
      install: './client/src/js/install.js', // Ensure this path is correct
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'client/dist'), // Ensure this path is correct
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/src/index.html', // Ensure this path is correct
        filename: 'index.html',
      }),
      new WebpackPwaManifest({
        name: 'J.A.T.E',
        short_name: 'TextEditor',
        description: 'A simple text editor that works offline',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: path.resolve('client/src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './client/src/src-sw.js', // Ensure this path is correct
        swDest: 'sw.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/, // Apply Babel to .js files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/, // Apply CSS loaders
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
