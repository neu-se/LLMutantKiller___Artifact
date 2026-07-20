The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query - basic deny policy', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            // Add a simple deny policy
            policyMap.add('deny-policy', {
                path: '/admin',
                verb: 'DELETE',
                effect: 'deny'
            });
            
            const result = policyMap.query('deny-policy', '/admin', 'DELETE', {});
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
policyMap.add is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.