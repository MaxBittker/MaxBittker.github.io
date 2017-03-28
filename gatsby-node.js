var fs = require("fs"),
    path = require("path");

exports.modifyWebpackConfig = function(config, stage) {
  // const jsBabelQuery = config._loaders.js.config.query;
  // config.loader('png', {
  //   test: /\.png/,
  //   exclude: /(node_modules)/,
  //   loader: 'babel',
  //   query: jsBabelQuery,
  // });

  // const origResolver = config.resolve;
  // config.resolve = function lightscriptResolve() {
    // const result = origResolver.call(this, arguments);
    // result.resolve.extensions.push('.lsc', '.lsx');
    // return result;
  // }
  // config.lol = 99;
  return config;
}

var p = "./pages/screenshots"

fs.readdir(p, function (err, files) {
  if (err) {
      throw err;
  }

  let data = files.filter(function (file) {
      return fs.statSync(path.join(p,file)).isFile();
  }).map(function (file) {
      return {
        name:'testTitle',
        loc:file,
      }
  });
  fs.writeFileSync(path.join(__dirname ,"pages/art.json"),
    JSON.stringify({screenshots:data}, null, 4) );
});
