The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test PolicyMap with complex patterns', function(done) {
        try {
            let policyMap = new _spacl_core.PolicyMap();
            
            // Test with multiple wildcards and complex contexts
            policyMap.add('complexPolicy', '/api/*/resources/*', { 
                permissions: ['read', 'write'], 
                department: 'engineering' 
            });
            
            let result1 = policyMap.matches('complexPolicy', '/api/v1/resources/123', {
                permissions: ['read', 'write'],
                department: 'engineering'
            });
            assert.strictEqual(result1, true, 'Should match complex pattern and context');
            
            // Test partial context match
            let result2 = policyMap.matches('complexPolicy', '/api/v1/resources/123', {
                permissions: ['read'],
                department: 'engineering'
            });
            // This depends on implementation - assuming partial match fails
            assert.strictEqual(result2, false, 'Should not match partial context');
            
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