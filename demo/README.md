```sh
cd ../
node ./bin.js demo/foo.js > demo/playground.js
browserify demo/main.js > demo/bundle.js
rm demo/playground.js
```

Alternatively an api can be used as demonstrated by [compile.js](compile.js).