The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - multiple rules', function(done) {
        try {
            const policy = new _spacl_core.Policy();
            const rule1 = { action: 'allow', resource: 'resource1' };
            const rule2 = { action: 'deny', resource: 'resource2' };
            const rule3 = { action: 'allow', resource: 'resource3' };
            
            const result = policy.push(rule1, rule2, rule3);
            
            // Verify all rules were added
            assert.strictEqual(policy.length, 3);
            assert.deepStrictEqual(policy[0], rule1);
            assert.deepStrictEqual(policy[1], rule2);
            assert.deepStrictEqual(policy[2], rule3);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

undefined !== 3
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.