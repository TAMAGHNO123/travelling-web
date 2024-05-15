const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Or 'production' depending on your needs

  entry: './init/index.js', // Replace './src/index.js' with your main entry point

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // This is where the built files will be placed
  },

  module: {
    rules: [
      // If you have any loaders, they should be defined here
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './views/Places/index.ejs',
      filename: 'index.html',
      templateParameters: {
        allPlace: [] // Assuming allPlace is an array. Adjust accordingly if it's not.
      },
    }),
  ],

  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
    },
  },
};