Your task is to write a test for the following function:
```
@spacl/core.Rule.prototype.allow(...verbs)
```

This function is defined as follows:
```
allow(...verbs) {
        for (const verb of verbs) {
            if (!(verb in this.verbs)) {
                this.verbs[verb] = true;
            }
        }
        return this;
    }
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');
describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.