The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with object spec', function(done) {
        try {
            const spec = {
                name: 'test-rule',
                condition: 'true',
                action: 'allow'
            };
            const rule = _spacl_core.Rule.for(spec);
            assert(rule !== null, 'Rule should not be null');
            assert(rule !== undefined, 'Rule should not be undefined');
            done();
        } catch (error) {
            done(error);
        }
    });

    })
``` 
failed with the following error message:
```
spec.match is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.