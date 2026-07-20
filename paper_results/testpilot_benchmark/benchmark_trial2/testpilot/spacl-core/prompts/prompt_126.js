The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test PolicyMap edge cases', function(done) {
        try {
            let policyMap = new _spacl_core.PolicyMap();
            
            // Test with empty strings
            policyMap.add('emptyPolicy', '', {});
            let result1 = policyMap.matches('emptyPolicy', '', {});
            assert.strictEqual(result1, true, 'Should handle empty strings');
            
            // Test with special characters in path
            policyMap.add('specialPolicy', '/api/test-resource_123', { id: 'special' });
            let result2 = policyMap.matches('specialPolicy', '/api/test-resource_123', { id: 'special' });
            assert.strictEqual(result2, true, 'Should handle special characters');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});
``` 
failed with the following error message:
```
policyMap.add is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.