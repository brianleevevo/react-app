import webpack from 'webpack';
import webpackConfig from './webpack.config.babel.js';

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err);
    throw err;
  }

  console.info(stats.toString(webpackConfig.stats));
});
