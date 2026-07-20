Your task is to write a test for the following function:
```
@spacl/core.Matcher.for(spec, version = '1.1')
```

This function is defined as follows:
```
for(spec, version = '1.1') {
        return new Matcher(spec, version);
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');
describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.