The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - basic deny rule', function(done) {
        try {
            // Create a policy that denies DELETE requests to /api/admin
            const policy = new _spacl_core.Policy();
            policy.addRule({
                effect: 'deny',
                path: '/api/admin',
                verb: 'DELETE',
                conditions: []
            });
            
            const result = policy.query('/api/admin', 'DELETE', {});
            assert.strictEqual(result.effect, 'deny');
            done();
        } catch (error) {
            done(error);
        }
    });

    })
``` 
failed with the following error message:
```
policy.addRule is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.