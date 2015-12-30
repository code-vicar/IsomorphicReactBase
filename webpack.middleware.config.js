var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index.js'
  ],
  output: {
    path: '/', //not used (bundle served from memory)
    publicPath: '/static/',
    filename: 'index.js'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
        'IS_CLIENT_BUNDLE': true,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference 
        query: {
          presets: ['react', 'es2015'],
          env: {
            development: {
              plugins: [
                [
                  'react-transform',
                  {
                    transforms: [{
                      transform: 'react-transform-hmr',
                      imports: ['react'],
                      locals: ['module']
                    }, {
                      transform: 'react-transform-catch-errors',
                      imports: [
                        "react",
                        "redbox-react"
                      ]
                    }]
                  }
                ]
              ]
            }
          }
        }
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.jsx', '.json'] 
  }
};