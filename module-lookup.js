
var Fs = require("fs");
var Path = require("path");

function loop (path, name, callback) {
  Fs.readdir(path, function (error, names) {
    if (error)
      return callback(error);
    if (names.indexOf("node_modules") === -1)
      return loop(Path.dirname(path), name, callback);
    Fs.readdir(Path.join(path, "node_modules"), function (error, names) {
      if (error)
        return callback(error);
      if (names.indexOf(name) === -1)
        return loop(Path.dirname(path), name, callback);
      Fs.readFile(Path.join(path, "node_modules", name, "package.json"), "utf8", function (error, content) {
        if (error)
          return callback(error);
        callback(null, Path.resolve(Path.join(path, "node_modules", name), JSON.parse(content).main || "./index.js"));
      });
    });
  });
};
