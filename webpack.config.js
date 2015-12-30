var process = require('process')

var webpack = require('webpack')

var isProdEnv = process.env.NODE_ENV === 'production' 

var config = {
  entry: './src/client/index.js',
  output: {
    filename: './dist/client/index.js'       
  },
  plugins: [
    new webpack.DefinePlugin({
        'IS_CLIENT_BUNDLE': true,
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference 
        query: {
          presets: ['react', 'es2015'],
        }
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.jsx', '.json'] 
  }
}

if (isProdEnv) {
  // https://webpack.github.io/docs/cli.html#production-shortcut-p
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
  config.plugins.push(new webpack.optimize.OccurenceOrderPlugin())
} else {
  // https://webpack.github.io/docs/cli.html#development-shortcut-d
  config.debug = true
  config.devtool = '#source-map'
  config.output.pathInfo = true
}

module.exports = config