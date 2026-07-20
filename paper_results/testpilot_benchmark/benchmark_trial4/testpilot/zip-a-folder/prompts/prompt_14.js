Your task is to write a test for the following function:
```
zip-a-folder.ZipAFolder.tar(srcFolder, tarFilePath, zipAFolderOptions) async
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let zip_a_folder = require('zip-a-folder');
describe('test zip_a_folder', function() {
    it('test zip-a-folder.ZipAFolder.tar', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.