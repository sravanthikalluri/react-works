var config = {
  //Pack the import file
  entry: './main.js',

  // Configure the package results, path define the output folder, and filename define the name of the package result file
  output: {
    path: './',
    filename: 'index.js'
  },

  // set server port number
  devServer: {
    inline: true,
    port: 3333,
    historyApiFallback: true,
  },

  //Configure the processing logic of the module and define the loader with the loaders
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
        {
            test: /\.(less|css)$/,
            loader: 'style!css'
        }
    ],
    node: {
        net: "empty",
        tls: "empty"
    }
  }
}

module.exports = config;
