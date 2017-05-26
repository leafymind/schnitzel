module.exports = {
  plugins: [
    require('postcss-hexrgba')({ /* ...options */ }),
    require('cssnext')({ /* ...options */ }),
    require('css-mqpacker')({ /* ...options */ }),
    require('autoprefixer')({ /* ...options */ })
  ]
}
