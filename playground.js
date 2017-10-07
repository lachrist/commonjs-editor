
var Fs = require("fs");
var Path = require("path");
var Browserify = require("browserify");
var Resolve = require("resolve");

module.exports = function (path, options, callback) {
  var options = options || {};
  options.basedir = options.basedir || Path.dirname(path);
  Fs.readFile(path, "utf8", function (error, content) {
    if (error)
      return callback(error);
    var browserify = Browserify(options);
    var modules = [];
    var result = {
      path: "/"+Path.relative(options.basedir, path),
      modules: []
    };
    function add (module, expose) {
      if (result.modules.indexOf(module) === -1) {
        browserify.require(module, {expose:expose});
        result.modules.push(expose);
      }
    }
    result.initial = content.replace(/([^a-zA-Z0-9_$]|^)require\s*\(\s*(("[^"]*")|('[^']*'))\s*\)/g, function (match, p1, p2) {
      var module = eval(p2);
      if (module[0] === ".")
        module = Path.resolve(Path.dirname(path), module);
      var expose = module[0] === "/" ? "/"+Path.relative(options.basedir, module) : module;
      if (module[0] !== "/" && !Resolve.isCore(module))
        module = Resolve.sync(module, {basedir:Path.dirname(path)});
      add(module, expose);
      return p1+"require("+JSON.stringify(expose)+")";
    });
    if (content.search(/([^a-zA-Z0-9_$]|^)Buffer([^a-zA-Z0-9_$]|$)/) !== -1)
      add("buffer", "buffer");
    browserify.bundle(function (error, bundle) {
      if (error)
        return callback(error);
      result.require = bundle.toString("utf8");
      callback(null, result);
    });
  });
};
