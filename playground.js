
var Fs = require("fs");
var Path = require("path");
var Browserify = require("browserify");

module.exports = function (path, callback) {
  Fs.readFile(path, "utf8", function (error, content) {
    if (error)
      return callback(error);
    var modules = [];
    content.replace(/[^a-zA-Z0-9_$]require\s*\(\s*(("[^"]*")|('[^']*'))\s*\)/g, function (match, p1) {
      modules.push(eval(p1));
    });
    if (content.search(/[^a-zA-Z0-9_$]Buffer[^a-zA-Z0-9_$]/) !== -1)
      modules.push("buffer");
    var browserify = Browserify({basedir:Path.dirname(path)});
    modules.forEach(function (module) { browserify.require(module) });
    browserify.bundle(function (error, bundle) {
      if (error)
        return callback(error);
      callback(null, {
        initial: content,
        modules: modules,
        require: bundle.toString("utf8")
      });
    });
  });
};
