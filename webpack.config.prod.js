import { merge } from 'webpack-merge';

import common from './webpack.config';

const config = merge(common, {
  mode: 'production',
  devtool: 'source-map',
});

export default config;
