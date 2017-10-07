Compilation steps required before loading [index.html](index.html):

```sh
node ../bin.js foo.js > playground.js
browserify main.js > bundle.js
rm playground.js
```

Alternatively an api can be used as demonstrated by [compile.js](compile.js).