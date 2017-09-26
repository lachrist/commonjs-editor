# commonjs-editor

Edit and execute top-level fileS of CommonJS modules in browsers.
CommonjsEditor is powered by [browserify](http://browserify.org) and [c9.ace.io](https://ace.c9.io).
Global support:
* `__filename`: always available.
* `__dirname`: always available.
* `process`: never available.
* `Buffer`: available if `Buffer` or `require("buffer")` is present in the top level file.

First, parse the top-level file of `my-module.js` for requires and bundle the result into `my-module-playground.js`:

```sh
commonjs-editor my-module.js > my-module-playground.js
```

Alternatively, an API is available:

```js
var Fs = require("fs");
var Playground = require("commonjs-editor/playground");
Playground("my-module.js", function (error, playground) {
  if (error)
    throw error;
  Fs.writeFileSync("my-module-playground.js", "module.exports="+JSON.stringify(playground), {encoding:"utf8"});
});
```

Second, create an [ace editor](https://ace.c9.io/#nav=api&api=editor) from the previously bundled module:

```js
var CommonjsEditor = require("commonjs-editor");
var MyModulePlayground = require("./my-module-playground.js");
var div = document.createElement("div");
var editor = CommonjsEditor(div, MyModulePlayground);
var MyModule = global.eval(editor.getBundle());
```