# PathContentRetriever

Cross-Platform NodeJS module that exports a function that can retrieve the contents (filenames/dirnames) of a given target path and all its subdirectories. The function returns a Javascript object with 2 array properties.

## Installation

_npm install content-retriever --save_

## Usage

```javascript
  var contentRetriever = require('content-retriever');

  contentRetriever.run('node_modules/content-retriever/example').then((res) => {
      console.log(res);
    })
```

## Example Output

```javascript
{ filenames:
   [ 'node_modules/content-retriever/example/example.js',
     'node_modules/content-retriever/example/foo/bar/bar1.txt',
     'node_modules/content-retriever/example/foo/bar/bar2.txt',
     'node_modules/content-retriever/example/foo/f1.txt',
     'node_modules/content-retriever/example/foo/f2.txt' ],
  dirnames:
   [ 'node_modules/content-retriever/example',
     'node_modules/content-retriever/example/foo',
     'node_modules/content-retriever/example/foo/bar',
     'node_modules/content-retriever/example/foo/bar/baz' ] }
```

## Test

_npm test_

## Release History

- 1.0.1 Initial release
