The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - wildcard path matching', function(done) {
        try {
            // Create a policy with wildcard path
            const policy = new _spacl_core.Policy();
            policy.addRule({
                effect: 'allow',
                path: '/api/*',
                verb: 'GET',
                conditions: []
            });
            
            const result1 = policy.query('/api/users', 'GET', {});
            const result2 = policy.query('/api/posts', 'GET', {});
            
            assert.strictEqual(result1.effect, 'allow');
            assert.strictEqual(result2.effect, 'allow');
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