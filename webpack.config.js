const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  //entry object where webpack looks to start building thebundle
  //absolute string to the directory that contains entry files
  //main file of our application
  entry: path.join(__dirname, 'src', 'index.js'),
  mode: process.env.NODE_ENV,
  //ouput tells webpack how to write the compiled files to disk
  //can only be one output
  //where webpack will put it's files after bundling
  output: {
    path:path.resolve(__dirname,'dist'),
    filename: 'index_bundle.js',
  },
  //specifies where our app will run (idk if needed)
  target: 'web',
  //dev server settings
  devServer: {
    host: 'localhost',
    port: 8080,
    //port app will run on
    //directory webpack will use to server static files
    static: {
      directory: path.join(__dirname, 'public')
    },
    //auto open browser after bundle
    open: true,
    //allows webpack Hot modules updates
    hot: true,
    //auto update the app as changes occur
    liveReload: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  },
  //specific rules about how webpack will handle diff files
  module: {
    rules: [
      //DONT FULLY UNDERSTAND RULES
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            //babel preset-env for transpiling ES2015+ syntax
            //preset-react for transpiling react code
            //transpiling = translating source code from one language
            //to another at the same level of abstraction
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    //simplifies creation of HTML files to serve webpack bundles
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    })
  ],
}

//junaids webpack
// const webpack = require('webpack');
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
//     entry: [
//       // entry point of our app
//       './client/index.js',
//     ],
//     output: {
//       path: path.resolve(__dirname, 'dist'),
//       publicPath: '/',
//       filename: 'bundle.js',
//     },
//     devtool: 'eval-source-map',
//     mode: 'development',
//     devServer: {
//       host: 'localhost',
//       // enable HMR on the devServer
//       hot: true,
//       // fallback to root for other urls
//       historyApiFallback: {
//         index: './dist/index.html'
//       },
//       static: {
//         // match the output path
//         directory: path.resolve(__dirname, 'dist'),
//         // match the output 'publicPath'
//         publicPath: '/dist/',
//       },
//       headers: { 'Access-Control-Allow-Origin': '*' },
//       /**
//        * proxy is required in order to make api calls to
//        * express server while using hot-reload webpack server
//        * routes api fetch requests from localhost:8080/api/* (webpack dev server)
//        * to localhost:3000/api/* (where our Express server is running)
//        */
//       proxy: {
//         '/database': {
//           target: 'http://localhost:3000/',
//           secure: false,
//         },
//       },
//     },
//     module: {
//       rules: [
//         {
//           test: /.(js|jsx)$/,
//           exclude: /node_modules/,
//           use: {
//             loader: 'babel-loader',
//           },
//         },
//         {
//           test: /.(css|scss)$/,
//           exclude: /node_modules/,
//           use: ['style-loader', 'css-loader'],
//         }
//       ],
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         template: './client/index.html',
//       }),
//     ],
//     resolve: {
//       // Enable importing JS / JSX files without specifying their extension
//       extensions: ['.js', '.jsx'],
//     },
//   };