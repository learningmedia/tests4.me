const del = require('del');
const util = require('util');
const path = require('path');
const yargs = require('yargs');
const csso = require('gulp-csso');
const less = require('gulp-less');
const webpack = require('webpack');
const mergeStream = require('merge-stream');
const { series, parallel, src, dest } = require('gulp');
const LessAutoprefix = require('less-plugin-autoprefix');

const SRC_FOLDER = 'src';
const DEST_FOLDER = 'dist';

const projectsToBuild = yargs.argv.all
  ? ['home', 'mathe']
  : [yargs.argv.home && 'home', yargs.argv.mathe && 'mathe'].filter(x => x);

if (projectsToBuild.length === 0) {
  projectsToBuild.push('home');
}

function clean() {
  return del(DEST_FOLDER);
}

function buildHtml() {
  const streams = projectsToBuild.map(project =>
    src(`${SRC_FOLDER}/${project}/index.html`)
      .pipe(dest(`${DEST_FOLDER}/${project}`))
  );
  return mergeStream(...streams);
}

async function buildJs() {
  const configs = projectsToBuild.map(project => ({
    name: project,
    mode: 'production',
    entry: `./${SRC_FOLDER}/${project}/main.js`,
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, `${DEST_FOLDER}/${project}`)
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    }
  }));

  const stats = await util.promisify(webpack)(configs);
  if (stats.hasErrors()) {
    console.log(stats.toString({
      builtAt: false,
      chunks: false,
      colors: true,
      entrypoints: false,
      hash: false,
      modules: false,
      timings: false,
      version: false
    }));
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

  const streams = projectsToBuild.map(project =>
    src(`${SRC_FOLDER}/${project}/main.less`)
      .pipe(less(lessOptions))
      .pipe(csso())
      .pipe(dest(`${DEST_FOLDER}/${project}`))
  );
  return mergeStream(...streams);
}

const build = parallel(buildJs, buildHtml, buildCss);
const ci = series(clean, build);

module.exports = {
  build,
  ci,
  default: build
};
