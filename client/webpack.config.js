const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/src/js/index.js',
   install: './client/src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'client/dist'),
    },
    plugins: [
      // Generates an HTML file from a template
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      // Generates a manifest file for the PWA
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'TextEditor',
        description: 'A simple text editor that works offline',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      // Injects the custom service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Your custom service worker file
        swDest: 'sw.js', // The output service worker file
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