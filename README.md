# commonjs-editor

Edit and execute top-level files of CommonJS modules in browsers.
Usage [here](demo/), live demo [here](https://cdn.rawgit.com/lachrist/commonjs-editor/9106eb66/test/index.html).
CommonjsEditor is powered by [browserify](http://browserify.org) and [c9.ace.io](https://ace.c9.io).
Node-inspired variables accessible inside the editor:
* `global`: the global object.
* `require`: for importing CommonJS modules.
* `module`: for redefining the entire export.
* `exports`: for exporting a particular field.
* `__filename`: relative to `options.basedir`.
* `__dirname`: relative to `options.basedir`.
* `process`: if defined: `process.argv[1] = __filename`.
* `Buffer`: only available when `Buffer` or `require("buffer")` is present.

## `Playground`

### `playground.path :: string`

* `playground :: commonjs-editor.Playground`

### `playground.modules :: [string]`

* `playground :: commonjs-editor.Playground`

### `playground.initial :: string`

* `playground :: commonjs-editor.Playground`

### `playground.require :: string`

* `playground :: commonjs-editor.Playground`

## `require("commonjs-editor/playground")(path, options, callback)`

* `path :: string`
* `options :: browserify.Options`
* `callback(error, playground)`
  * `error :: Error`
  * `playground :: commonjs-editor.Playground`

## `editor = require("commonjs-editor")(container, playground)`

* `container :: dom.Element`
* `playground :: commonjs-editor.Playground`
* `editor :: c9.ace.io.Editor`
  * `bundle = getBundle()`
