
var Brace = require("brace");
var Path = require("path");
require("brace/mode/javascript");
require("brace/theme/chrome");

function getBundle () {
  return [
    "(function () {",
    "  "+this._commonjs_playground.require,
    "  var global = this;",
    "  var module = {exports:{}};",
    "  var exports = module.exports;",
    this._commonjs_playground.modules.indexOf("buffer") === -1 ? "" : "var Buffer = require(\"buffer\");",
    "  var __dirname = "+JSON.stringify(Path.basename(this._commonjs_playground.path)),
    "  var __filename = "+JSON.stringify(this._commonjs_playground.path),
    "  "+this.getValue(),
    "  return module.exports;",
    "} ())"
  ].join("\n");
}

module.exports = function (container, playground) {
  playground = playground || {};
  var editor = Brace.edit(container);
  editor.$blockScrolling = Infinity;
  editor.setShowPrintMargin(false);
  editor.getSession().setMode("ace/mode/javascript");
  editor.setTheme("ace/theme/chrome");
  if (playground.modules.length) {
    editor.setValue([
      "// Modules available for require:",
      "//  "+playground.modules.join("\n//  "),
      playground.initial || "",
    ].join("\n"));
  } else {
    editor.setValue(playground.initial || "");
  }
  editor.session.selection.clearSelection();
  editor._commonjs_playground = playground;
  editor.getBundle = getBundle;
  return editor;
};
