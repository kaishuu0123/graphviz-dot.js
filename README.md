# graphviz-dot.js

* dot (graphviz) command implement by javascript. (single binary)
   * include converted graphviz by emscripten.

## GOAL

* easily distribute dot command.
  * use [Graphviz Preview](https://marketplace.visualstudio.com/items?itemName=EFanZh.graphviz-preview) VScode plugin easily.
  * use [BurntSushi/erd](https://github.com/BurntSushi/erd) easily.
* png format support.

## Now Support Feature

* support format: svg, pdf
* pipe(stdin) input
    * `cat dot_files/test.dot | dot.js -T svg`

## How to Use? (Tutorial)

* use node.js
```
$ node bin/dot.js -T svg dot_files/test.dot -o test.svg
```

* use single binary

```
$ graphviz-dot -T svg dot_files/test.dot -o test.svg
```

## How it work?

* converted graphviz by emscripten. (viz.js/viz-lite.js)
* cross compile by [pkg](https://github.com/zeit/pkg)

## BUILDING

* use [pkg](https://github.com/zeit/pkg) (version: 4.2.6)
* node.js version: v8.9.3
* emscripten version: 1.37.22

### BUILD viz-lite.js

```
$ cd viz.js
$ make viz-lite.js
```

### BUILD graphviz-dot.js

```
$ pkg package.json --targets (you want to build platform.)
# example (for linux x64)
$ pkg package.json --targets node8-linux-x64
# example (for win x64)
$ pkg package.json --targets node8-win-x64
# All targets
$ pkg package.json --targets=linux-x64,linux-x86,macos-x64,win-x64,win-x86
```

## Credits

This work is based off of several existing projects:

* https://github.com/zeit/pkg
* https://github.com/mdaines/viz.js
* http://manuels.github.io/unix-toolbox.js/
