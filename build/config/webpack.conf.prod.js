const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BabiliPlugin = require("babili-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = require('./webpack.conf.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig,
{
  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].[id].js'
  },

  plugins:
  [
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin
    ({
      'process.env':
      {
        'ENV': JSON.stringify(ENV)
      }
    }),

    new BabiliPlugin({}, { comments: false }),

    new FaviconsWebpackPlugin
    ({
      logo: path.join(__dirname, '../../src/client/assets/img/logo.png'),
      prefix: 'assets/meta/',
      inject: true,
      config:
      {
        appName: 'Schnitzel',
        appDescription: 'Schnitzeljagt',
        appleStatusBarStyle: 'black-translucent',
        background: "#673AB7",
        theme_color: "#673AB7",
        lang: 'de-DE',
        display: "standalone",
        orientation: "portrait",
        start_url: '/#/overview?homescreen=true',
        icons:
        {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: false,
          opengraph: true,
          twitter: true,
          yandex: false,
          windows: true
        }
      },
    }),

    new OfflinePlugin
    ({
      publicPath: '/',
      caches: {
        main: [
          'vendor.*.js',
          'app.*.js',
          ':externals:'
        ],
        optional: [
          ':rest:'
        ]
      },
      externals: [
        '/',
        '/assets/meta/manifest.json',
        'https://fonts.googleapis.com/css?family=Material+Icons|Roboto:300,400,500,700',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.deep_purple-purple.min.css',
        'https://cdn.polyfill.io/v2/polyfill.min.js?features=es6'
      ],
      ServiceWorker: {
        minify: true,
        navigateFallbackURL: '/'
      },
      AppCache: {
        caches: ['main', 'optional'],
        FALLBACK: {
          '/': '/offline-page.html'
        }
      }
    }),

		new CompressionPlugin
    ({
			asset: "[path].gz[query]",
			algorithm: "zopfli",
			test: /\.(js|html)$/,
			minRatio: 0.8
		}),

    new BundleAnalyzerPlugin
    ({
      analyzerMode: 'static',
      reportFilename: '../.tmp/report.html',
      openAnalyzer: false
    })
  ]
});
