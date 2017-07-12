module.exports = function(config)
{
  config.set
  ({
    frameworks: ['mocha', 'chai'],
    files: ['../../src/**/*.spec.js'],
    reporters: ['spec'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    singleRun: true, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    preprocessors:
    {
      '../../src/client/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack:
    {
      module: // TODO refundant with webpack.conf
      {
        rules:
        [
          {
            test: /\.svelte$/,
            exclude: /node_modules/,
            use: ['svelte-loader', 'postcss-html-loader']
          }
        ]
      }
    },

    webpackMiddleware:
    {
      noInfo: true,
      stats: { chunks: false }
    },

    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require("karma-webpack"),
      require("karma-sourcemap-loader"),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter')
    ]
  })
}
