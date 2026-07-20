Your task is to write a test for the following function:
```
jsonfile.readFile(...args)
```

This function is defined as follows:
```
function (...args) {
    const cb = args[args.length - 1]
    if (typeof cb !== 'function') return fn.apply(this, args)
    else {
      args.pop()
      fn.apply(this, args).then(r => cb(null, r), cb)
    }
  }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
describe('test jsonfile', function() {
    it('test jsonfile.readFile', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.