Your task is to write a test for the following function:
```
image-downloader.image({ extractFilename = true, ...options } = {})
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