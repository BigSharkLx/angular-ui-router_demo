var debug = process.env.NODE_ENV !== "production";

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
  app: path.join(__dirname, 'src/js/index.js'),
  build: path.join(__dirname, 'dist'),
};
const mainRules=debug?[
  {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
      { test: /\.less$/,
        use:[
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
          'less-loader'
        ]
      },
      { test:/\.(png|gif|jpg|jpeg|bmp)$/i, use:['url-loader?limit=10000']
    },
      { test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i, use:['url-loader?limit=5000']
      }
]:[
  {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /(node_modules|bower_components)/,
      },
      {
         // css文件打包
          test: /\.css$/,
          use: ExtractTextPlugin.extract([ 'css-loader', 'postcss-loader' ])
        },
        {
         // less文件打包
          test: /\.less$/,
          use: ExtractTextPlugin.extract([ 'css-loader',
          'postcss-loader','less-loader' ])
        },
        { test:/\.(png|gif|jpg|jpeg|bmp)$/i, use:['url-loader?limit=10000&name=src/img/[name].[chunkhash:8].[ext]']
      },
        { test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i, use:['url-loader?limit=5000&name=src/img/[name].[chunkhash:8].[ext]']
        }
];
module.exports={
  context: path.join(__dirname),
  devtool:debug?"cheap-module-source-map":'',
  resolve: {
    extensions: ['.js', '.jsx', '.css','less'] //后缀名自动补全
  },
  entry:debug?[
    'webpack/hot/only-dev-server',
  PATHS.app
]:{
  main:PATHS.app,
  vendor:['jquery']
}
  ,
  output: {
    path: PATHS.build,
    filename:debug?'bundle.js':'[name].[chunkhash:8].min.js',
  },
  devServer:debug?{
    //使能历史记录api
    historyApiFallback:true,
    // hotOnly:true,
    stats:'errors-only',
    host:process.env.Host,
    port:process.env.PORT,
    overlay:{
      errors:true,
      warnings:true,
    }
  }:{},
  module:{
    rules:mainRules
  },
    plugins:debug? [
      new HtmlWebpackPlugin({
        filename:'index.html',
        template:'./src/index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function(){
          return [ require("autoprefixer")({ browsers: ['last 2 versions'] }) ];
        }
      }
    })
    ]:[
  new ExtractTextPlugin('stylesheets/style.min.css'),
      new HtmlWebpackPlugin({
        filename:'index.html',
        template:'./src/index.html'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
       sourceMap: true,
       mangle: true,
        comments: false,
      }),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function(){
          return [ require("autoprefixer")({ browsers: ['last 2 versions'] }) ];
        }
      }
    }),
  ]
};
