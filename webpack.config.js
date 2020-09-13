const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';



module.exports = {
  entry: {
    index: './src/index.js',
    about: './src/about/index.js',
    analytics: './src/analytics/index.js',
},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader'
        ] // к этим файлам нужно применить пакеты, которые мы уже установили
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: 'file-loader?name=./fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|jpeg|png|svg|webp)$/,
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: './src/about/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'analytics.html',
      template: './src/analytics/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),

    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackMd5Hash()
  ]
}