var path = require('path')
var BundleTracker = require('webpack-bundle-tracker')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: {
    nattr: './nattr/src/scripts/index.js'
  },
  output: {
    path: path.join(__dirname, 'nattr', 'dist'),
    filename: '[name].scripts.js',
    publicPath: '/static/dist/'
    // chunkFilename: '[name].js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/, /\.es6$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: [/\.css$/, /\.scss$/],
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$|\.jpe?g$|\.gif$|\.png$|\.svg$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new BundleTracker({ filename: 'webpack-stats.json' }),
    new ExtractTextPlugin({
      filename: '[name].styles.css',
      allChunks: true
    })
  ],
  devtool: 'source-map'
}
