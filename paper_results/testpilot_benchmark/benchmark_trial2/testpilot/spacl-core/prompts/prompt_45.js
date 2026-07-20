Your task is to write a test for the following function:
```
@spacl/core.Rule.prototype.query(path, verb, ctx)
```

This function is defined as follows:
```
query(path, verb, ctx) {
        if (this.matches(path, ctx) && verb in this.verbs) {
            return this.verbs[verb];
        }
        return null;
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');
describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.