
var Fs = require("fs");
var Path = require("path");
var Browserify = require("browserify");

function absolute (module) { return module[0] === "." ? module.substring(1) : module }

module.exports = function (path, callback) {
  Fs.readFile(path, "utf8", function (error, content) {
    if (error)
      return callback(error);
    var modules = [];
    content = content.replace(/([^a-zA-Z0-9_$]|^)require\s*\(\s*(("[^"]*")|('[^']*'))\s*\)/g, function (match, p1, p2) {
      var module = eval(p2);
      modules.push(module);
      return p1+"require("+JSON.stringify(absolute(module))+")";
    });
    if (content.search(/([^a-zA-Z0-9_$]|^)Buffer([^a-zA-Z0-9_$]|$)/) !== -1)
      modules.push("buffer");
    var browserify = Browserify({basedir:Path.dirname(path)});
    modules.forEach(function (module) { browserify.require(module, {expose:module}) });
    browserify.bundle(function (error, bundle) {
      if (error)
        return callback(error);
      callback(null, {
        filename: Path.basename(path),
        initial: content,
        modules: modules.map(absolute),
        require: bundle.toString("utf8")
      });
    });
  });
};
