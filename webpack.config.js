const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');
const noop = require('noop-webpack-plugin')
const path = require('path');

const IS_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') >= 0;
const ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION_BUILD = (ENV !== 'development') && !IS_DEV_SERVER;
const IS_PRODUCTION = ENV === 'production';
const DIST_DIRECTORY_PATH = path.resolve(__dirname, 'dist');
const SRC_DIRECTORY_PATH = path.resolve(__dirname, 'src');
const ASSETS_PATH = `${SRC_DIRECTORY_PATH}/assets`;
const TITLE = capitalizeTitle(process.env.npm_package_name);

console.log('--- building... ---')
console.log('IS_DEV_SERVER', IS_DEV_SERVER)
console.log('ENV', ENV)
console.log('-------------------')

module.exports = {
  mode: IS_PRODUCTION_BUILD ? 'production' : 'development',
  entry: {
    background: `${SRC_DIRECTORY_PATH}/background/background.ts`,
    popup: `${SRC_DIRECTORY_PATH}/popup/popup.tsx`
  },
  output: {
    path: DIST_DIRECTORY_PATH,
    filename: '[name].js'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".less"],
    alias: {
      popup: path.resolve(SRC_DIRECTORY_PATH, 'popup'),
      background: path.resolve(SRC_DIRECTORY_PATH, 'background')
    }
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(DIST_DIRECTORY_PATH, {
      verbose:  false,
      dry:      false
    }),
    // add react dom and react as providers
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
    }),
    // copy needed html files
    new HtmlWebpackPlugin({
      template: 'src/popup/popup.html',
      filename: 'popup.html',
      chunks: ["popup"],
      inject: true,
      title: TITLE,
      isProduction: IS_PRODUCTION,
      minify: IS_PRODUCTION_BUILD ? {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        minifyJS: true,
      }: {}
    }),
    // copy the manifest and transform needed values
    new CopyWebpackPlugin([{
      from: `${SRC_DIRECTORY_PATH}/manifest.json`,
      transform: function (content, path) {
        // edit the manifest file with the package.json configurations
        const manifest = JSON.parse(content.toString())
        const description = process.env.npm_package_description;
        const name = TITLE;
        const version = process.env.npm_package_version;
        Object.assign(manifest, {
          description,
          name: IS_PRODUCTION ? name : `${ENV} - ${name}` ,
          version
        })
        return Buffer.from(JSON.stringify(manifest))
      }
    }]),
    // copy all the assets
    new CopyWebpackPlugin([{
      from: ASSETS_PATH
    }]),
    // forces the dev server to build files (npm run dev)
    IS_DEV_SERVER ? new WriteFilePlugin() : noop(),
    // zip everything up when building (npm run build) - must be last to work properly
    IS_DEV_SERVER ? noop() : new ZipWebpackPlugin({
      filename: `${ENV}-${process.env.npm_package_name}.zip`
    })
  ],
  optimization: {
    minimizer: [
      IS_PRODUCTION_BUILD ? new UglifyJsPlugin() : noop()
    ]
  }
};

// convert a package.json  style title to a nicely readable title
function capitalizeTitle(str) {
  str = str.replace(/[-_]/g, ' '); // replace kebab and snake case (camel not supported in package.json)
  str = str.split(' ') // split to individual words
  str = str.map(w => w[0].toUpperCase() + w.slice(1)) // uppercase each word's first character
  str = str.join(' ') // join it back to a string
  return str
}
