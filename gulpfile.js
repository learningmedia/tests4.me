const del = require('del');
const util = require('util');
const path = require('path');
const yargs = require('yargs');
const csso = require('gulp-csso');
const less = require('gulp-less');
const webpack = require('webpack');
const connect = require('gulp-connect');
const mergeStream = require('merge-stream');
const LessAutoprefix = require('less-plugin-autoprefix');
const { series, parallel, src, dest, watch } = require('gulp');

const SRC_FOLDER = 'src';
const DEST_FOLDER = 'dist';

let server;

const projectsToBuild = yargs.argv.all
  ? ['home', 'mathe']
  : [yargs.argv.home && 'home', yargs.argv.mathe && 'mathe'].filter(x => x);

if (projectsToBuild.length === 0) {
  projectsToBuild.push('home');
}

const serverRootDir = `${DEST_FOLDER}/${projectsToBuild[0]}`;

function clean() {
  return del(DEST_FOLDER);
}

function buildFonts() {
  const streams = projectsToBuild.map(project =>
    src('node_modules/semantic-ui-css//themes/default/assets/fonts/*')
      .pipe(dest(`${DEST_FOLDER}/${project}/fonts`))
  );
  return mergeStream(...streams)
    .pipe(connect.reload());
}

function buildHtml() {
  const streams = projectsToBuild.map(project =>
    src(`${SRC_FOLDER}/${project}/index.html`)
      .pipe(dest(`${DEST_FOLDER}/${project}`))
  );
  return mergeStream(...streams)
    .pipe(connect.reload());
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
  } else if (server) {
    src(`${serverRootDir}/main.js`, { read: false }).pipe(connect.reload());
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
  return mergeStream(...streams)
    .pipe(connect.reload());
}

function serveReload() {
  server = connect.server({
    root: [serverRootDir],
    port: 3000,
    livereload: true
  });
  watch('src/**/*.js', buildJs);
  watch('src/**/*.less', buildCss);
  watch('src/**/*.html', buildHtml);
}

const build = parallel(buildJs, buildHtml, buildCss, buildFonts);
const ci = series(clean, build);

module.exports = {
  build,
  ci,
  serveReload,
  default: series(build, serveReload)
};
