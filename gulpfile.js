const del = require('del');
const util = require('util');
const path = require('path');
const webpack = require('webpack');
const { series, parallel, src, dest } = require('gulp');

const SRC_FOLDER = 'src';
const DEST_FOLDER = 'dist';
const PROJECT = 'mathe';

function clean() {
  return del(DEST_FOLDER);
}

function buildHtml() {
  return src(`${SRC_FOLDER}/${PROJECT}/index.html`).pipe(dest(`${DEST_FOLDER}/${PROJECT}`));
}

async function buildJs() {
  const config = {
    mode: 'production',
    entry: `./${SRC_FOLDER}/${PROJECT}/main.js`,
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, `${DEST_FOLDER}/${PROJECT}`)
    }
  };
  const stats = await util.promisify(webpack)(config);
  if (stats.hasErrors()) {
    console.log(stats.toString());
  }
}

const build = parallel(buildJs, buildHtml);
const bundle = series(clean, build);

module.exports = {
  build,
  bundle,
  default: bundle
};
