The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - single policy', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            const mockPolicy = { id: 'policy1', name: 'Test Policy 1' };
            
            const result = policyMap.push(mockPolicy);
            
            // Verify the policy was added
            assert.strictEqual(policyMap.length, 1);
            assert.deepStrictEqual(policyMap[0], mockPolicy);
            
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

undefined !== 1
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.