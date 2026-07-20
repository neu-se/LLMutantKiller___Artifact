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

You may use the following examples to guide your implementation:
```
// usage #1
const download = require('image-downloader');const options = {  url: 'http://someurl.com/image.jpg',  dest: '/path/to/dest',               // will be saved to /path/to/dest/image.jpg};download.image(options)  .then(({ filename }) => {    console.log('Saved to', filename); // saved to /path/to/dest/image.jpg  })  .catch((err) => console.error(err));
// usage #2
const download = require('image-downloader');options = {  url: 'http://someurl.com/image2.jpg',  dest: '/path/to/dest/photo.jpg',     // will be saved to /path/to/dest/photo.jpg};download.image(options)  .then(({ filename }) => {    console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg  })  .catch((err) => console.error(err));
// usage #3
const download = require('image-downloader');options = {  url: 'http://someurl.com/image3.jpg',  dest: '/path/to/dest/photo',         // will be saved to /path/to/dest/photo  extractFilename: false,};download.image(options)  .then(({ filename }) => {    console.log('Saved to', filename), // saved to /path/to/dest/photo  })  .catch((err) => console.error(err));
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