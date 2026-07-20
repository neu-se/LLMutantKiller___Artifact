Your task is to write a test for the following function:
```
jsonfile.readFileSync(file, options = {})
```

This function is defined as follows:
```
function readFileSync (file, options = {}) {
  if (typeof options === 'string') {
    options = { encoding: options }
  }

  const fs = options.fs || _fs

  const shouldThrow = 'throws' in options ? options.throws : true

  try {
    let content = fs.readFileSync(file, options)
    content = stripBom(content)
    return JSON.parse(content, options.reviver)
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`
      throw err
    } else {
      return null
    }
  }
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
describe('test jsonfile', function() {
    it('test jsonfile.readFileSync', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.