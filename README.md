# commonjs-editor

Edit and execute top-level files of CommonJS modules in browsers.
CommonjsEditor is powered by [browserify](http://browserify.org) and [c9.ace.io](https://ace.c9.io).
Global support:
* `global`: always available
* `__filename`: always available.
* `__dirname`: always available.
* `process`: never available.
* `Buffer`: available if the top level file contains `Buffer` or `require("buffer")`.

Usage [here](test/main.js) and compilation [here](test/compile.js), resulting demo [here](https://cdn.rawgit.com/lachrist/commonjs-editor/9106eb66/test/index.html).
Alternatively, the compilation can also be realised via the CLI:

```sh
node ../bin.js foo.js > playground.js
browserify main.js > bundle.js
rm playground.js
```

## `Playground`

### `playground.path :: string`

* `playground :: commonjs-editor.Playground`

### `playground.modules :: [string]`

* `playground :: commonjs-editor.Playground`

### `playground.initial :: string`

* `playground :: commonjs-editor.Playground`

### `playground.require :: string`

* `playground :: commonjs-editor.Playground`

## `require("commonjs-editor/playground")(path, callback)`

* `path :: string`
* `options :: object`
* `callback(error, playground)`
  * `error :: Error`
  * `playground :: commonjs-editor.Playground`

## `editor = require("commonjs-editor")(container, playground)`

* `container :: dom.Element`
* `playground :: commonjs-editor.Playground`
* `editor :: c9.ace.io.Editor`
  * `bundle = getBundle()`
