const del = require('del');
const util = require('util');
const path = require('path');
const csso = require('gulp-csso');
const less = require('gulp-less');
const webpack = require('webpack');
const { series, parallel, src, dest } = require('gulp');
const LessAutoprefix = require('less-plugin-autoprefix');

const SRC_FOLDER = 'src';
const DEST_FOLDER = 'dist';
const PROJECT = 'mathe';

function clean() {
  return del(DEST_FOLDER);
}

function buildHtml() {
  return src(`${SRC_FOLDER}/${PROJECT}/index.html`)
    .pipe(dest(`${DEST_FOLDER}/${PROJECT}`));
}

async function buildJs() {
  const config = {
    mode: 'production',
    entry: `./${SRC_FOLDER}/${PROJECT}/main.js`,
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, `${DEST_FOLDER}/${PROJECT}`)
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    }
  };
  const stats = await util.promisify(webpack)(config);
  if (stats.hasErrors()) {
    console.log(stats.toString());
  }
}

function buildCss() {
  const autoprefixOptions = {
    browsers: ['last 3 versions', 'Firefox ESR', 'IE 11']
  };
  const lessOptions = {
    javascriptEnabled: true,
    plugins: [new LessAutoprefix(autoprefixOptions)]
  };

  return src(`${SRC_FOLDER}/${PROJECT}/main.less`)
    .pipe(less(lessOptions))
    .pipe(csso())
    .pipe(dest(`${DEST_FOLDER}/${PROJECT}`));
}

const build = parallel(buildJs, buildHtml, buildCss);
const bundle = series(clean, build);

module.exports = {
  build,
  bundle,
  default: bundle
};
