Your task is to write a test for the following function:
```
image-downloader.image({ extractFilename = true, ...options } = {})
```

This function is defined as follows:
```
({ extractFilename = true, ...options } = {}) => {
  if (!options.url) {
    return Promise.reject(new Error('The options.url is required'));
  }

  if (!options.dest) {
    return Promise.reject(new Error('The options.dest is required'));
  }

  if (extractFilename) {
    if (!path.extname(options.dest)) {
      const url = new URL(options.url);
      const pathname = url.pathname;
      const basename = path.basename(pathname);
      const decodedBasename = decodeURIComponent(basename);

      options.dest = path.join(options.dest, decodedBasename);
    }
  }

  if (!path.isAbsolute(options.dest)) {
    options.dest = path.resolve(__dirname, options.dest);
  }

  return request(options);
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let image_downloader = require('image-downloader');
describe('test image_downloader', function() {
    it('test image-downloader.image', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.