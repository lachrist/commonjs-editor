
var Fs = require("fs");
var Path = require("path");
var Browserify = require("browserify");
var Resolve = require("resolve");
var Stream = require("stream");

module.exports = function (path, options, callback) {
  var options = options || {};
  options.detectGlobals = false;
  var basedir = options.basedir || Path.dirname(path);
  delete options.basedir;
  Fs.readFile(path, "utf8", function (error, content) {
    if (error)
      return callback(error);
    function checkbuffer (content) {
      if (result.modules.indexOf("buffer") === -1 && content.search(/([^a-zA-Z0-9_$]|^)Buffer([^a-zA-Z0-9_$]|$)/) !== -1) {
        browserify.require("buffer", "buffer");
        result.modules.push("buffer");
      }
    }
    var modules = [];
    var result = {
      path: "/"+Path.relative(basedir, path),
      modules: []
    };
    var browserify = Browserify(options);
    browserify.transform(function (file) {
      var content = "";
      var stream = new Stream.Transform({
        decodeStrings: false,
        transform: function (chunk, encoding, callback) {
          content += chunk;
          stream.push(chunk, encoding);
          callback();
        },
        flush: function (callback) {
          checkbuffer(content);
          var filename = "/"+Path.relative(basedir, file);
          stream.push("\n} ("+JSON.stringify(filename)+","+JSON.stringify(Path.dirname(filename))+"));");
          callback();
        }
      });
      stream.push("(function (__filename, __dirname) {\n");
      return stream;
    }, {global:true});
    checkbuffer(content);
    result.initial = content.replace(/([^a-zA-Z0-9_$]|^)require\s*\(\s*(("[^"]*")|('[^']*'))\s*\)/g, function (match, p1, p2) {
      var module = eval(p2);
      if (module[0] === ".")
        module = Path.resolve(Path.dirname(path), module);
      var expose = module[0] === "/" ? "/"+Path.relative(basedir, module) : module;
      if (module[0] !== "/" && !Resolve.isCore(module))
        module = Resolve.sync(module, {basedir:Path.dirname(path)});
      if (result.modules.indexOf(module) === -1) {
        browserify.require(module, {expose:expose});
        result.modules.push(expose);
      }
      return p1+"require("+JSON.stringify(expose)+")";
    });
    browserify.bundle(function (error, bundle) {
      if (error)
        return callback(error);
      result.require = bundle.toString("utf8");
      callback(null, result);
    });
  });
};
