module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-import': {},
    'cssnano': {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    }
  }
};
