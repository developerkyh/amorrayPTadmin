const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const compiler = require('vue-template-compiler');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
let LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  // mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    hot: true,
    publicPath: '/dist/',
    compress: true,
    port: 3000,
    historyApiFallback: {
      disableDotRule: true // Router를 사용할 경우 refresh 했을때 현페이지 유지
    },
    // open:true,
    headers: {
      // "Access-Control-Allow-Origin": "localhost:22",
      "Access-Control-Allow-Origin": "http://10.41.76.139",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  entry: {
    app: [
      '@babel/polyfill',
      './build/js/index',
      './build/src/main',
      './build/less/AdminLTE',
      './build/less/skins/_all-skins',
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'), // 뱉어낼 파일 경로
    publicPath: 'dist/', // 파일들이 위치할 서버상의 경로
    filename: 'app.js',
    hotUpdateChunkFilename: 'hot/hot-update.js', // 내가 지금까지 발견 한 가장 좋은 방법은 해당 청크에 대한 특정 폴더와 파일을 정의하는 것
    hotUpdateMainFilename: 'hot/hot-update.json' // 내가 지금까지 발견 한 가장 좋은 방법은 해당 청크에 대한 특정 폴더와 파일을 정의하는 것
    // chunkFilename: "[id].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        /*
          options: {
              loaders: {
                  css: ExtractTextPlugin.extract({
                      use: 'css-loader',
                      fallback: 'vue-style-loader'
                  })
              }
          }
        } */
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [require('@babel/plugin-proposal-object-rest-spread')]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          // process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {importLoaders: 1}
          }
          // 'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/dist/img/',
              name: 'img/[name].[hash:10].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]?[hash]',
            publicPath: '/dist/',
            limit: 10000 // 10kb
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new LiveReloadPlugin({
      protocol: 'http',
      port: 35729,
      hostname: 'localhost',
      // hostname: '106.10.58.121/',
      appendScriptTag: true
    }),
    new webpack.NamedModulesPlugin(), // 브라우저에서 HMR 에러발생시 module name 표시
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: false, // index 주입 false
      hash: true,
      chunks: ['index', 'app', 'system', 'monitor'],
      minify: { // (https://github.com/kangax/html-minifier)
        collapseWhitespace: false, // 문서 트리의 텍스트 노드에 공헌하는 공백 축소
        removeAttributeQuotes: false, // 따옴표
        removeComments: false // 주석
      }
    }),
    new ExtractTextPlugin('css/AdminLTE.css')
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['.js', '.json', '.jsx', '.css', '.less'],
    alias: { vue: 'vue/dist/vue.esm.js' }
  },
  optimization: {
    minimize: false,
    splitChunks: {},
    concatenateModules: true
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'http://10.41.76.139:2294'
      // apiUrl: 'http://10.41.76.139:22'
    })
  }
};

