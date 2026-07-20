Your task is to write a test for the following function:
```
jsonfile.writeFileSync(file, obj, options = {})
```

This function is defined as follows:
```
function writeFileSync (file, obj, options = {}) {
  const fs = options.fs || _fs

  const str = stringify(obj, options)
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
describe('test jsonfile', function() {
    it('test jsonfile.writeFileSync', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.