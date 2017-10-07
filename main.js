
var Brace = require("brace");
var Path = require("path");
require("brace/mode/javascript");
require("brace/theme/monokai");

function getBundle () {
  return [
    "(function () {",
    "  "+this._commonjs_playground.require,
    "  if (typeof process !== \"undefined\" && Array.isArray(process.argv))",
    "    process.argv[1] = "+JSON.stringify(this._commonjs_playground.path)+";",
    "  var Buffer = "+(this._commonjs_playground.modules.indexOf("buffer") === -1 ? "void 0;" : "require(\"buffer\");"),
    "  var global = this;",
    "  return (function () {",
    "    var module = {exports:{}};",
    "    var exports = module.exports;",
    "    var __filename = "+JSON.stringify(this._commonjs_playground.path)+";",
    "    var __dirname = "+JSON.stringify(Path.dirname(this._commonjs_playground.path))+";",
    "    "+this.getValue(),
    "    return module.exports;",
    "  } ());",
    "} ())"
  ].join("\n");
}

module.exports = function (container, playground) {
  playground = playground || {};
  playground.modules = playground.modules || [];
  playground.require = playground.require || "function require () { throw new Error(\"No module available to require\") }";
  playground.path = playground.path || "/main.js";
  var editor = Brace.edit(container);
  editor.$blockScrolling = Infinity;
  editor.setShowPrintMargin(false);
  editor.getSession().setMode("ace/mode/javascript");
  editor.setTheme("ace/theme/monokai");
  if (playground.modules.length) {
    var comments = playground.modules.map(function (name) { return "  - "+name });
    comments.unshift(playground.path+" >> available modules:");
  } else {
    var comments = [playground.path];
  }
  var value = comments.map(function (line) { return "// "+line+"\n" }).join("")+playground.initial;
  editor.setValue(value, 1);
  editor.setOption("maxLines", value.split("\n").length);
  editor._commonjs_playground = playground;
  editor.getBundle = getBundle;
  return editor;
};
