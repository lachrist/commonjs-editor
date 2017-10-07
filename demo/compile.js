var Fs = require("fs");
var Path = require("path");
var Playground = require("../playground.js");
var Browserify = require("browserify");
Playground(Path.join(__dirname, "foo.js"), function (error, playground) {
  if (error)
    throw error;
  var content = "module.exports = "+JSON.stringify(playground)+";";
  Fs.writeFileSync(Path.join(__dirname, "playground.js"), new Buffer(content, "utf8"));
  Browserify(Path.join(__dirname, "main.js")).bundle(function (error, bundle) {
    if (error)
      throw error;
    Fs.writeFileSync(Path.join(__dirname, "bundle.js"), bundle);
    Fs.unlinkSync(Path.join(__dirname, "playground.js"));
  });
});