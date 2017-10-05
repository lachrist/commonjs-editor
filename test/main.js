var CommonjsEditor = require("../main.js");
var Playground = require("./playground.js");
var div = document.createElement("div");
var editor = CommonjsEditor(div, Playground);
document.body.appendChild(div);
var button = document.createElement("button");
button.textContent = "Eval";
button.addEventListener("click", function () {
  alert(JSON.stringify(global.eval(editor.getBundle()), null, 2));
});
document.body.appendChild(button);