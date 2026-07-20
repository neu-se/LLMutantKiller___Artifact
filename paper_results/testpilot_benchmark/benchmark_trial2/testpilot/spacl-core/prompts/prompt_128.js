The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.matches', function(done) {
        try {
            // Create a PolicyMap instance
            let policyMap = new _spacl_core.PolicyMap();
            
            // Test 1: Empty policy map should not match anything
            let result1 = policyMap.matches('testPolicy', '/test/path', {});
            assert.strictEqual(result1, false, 'Empty policy map should not match');
            
            // Test 2: Add a simple policy and test matching
            policyMap.add('readPolicy', '/api/*', { action: 'read' });
            let result2 = policyMap.matches('readPolicy', '/api/users', { action: 'read' });
            assert.strictEqual(result2, true, 'Should match policy with wildcard path');
            
            // Test 3: Test non-matching path
            let result3 = policyMap.matches('readPolicy', '/admin/users', { action: 'read' });
            assert.strictEqual(result3, false, 'Should not match different path');
            
            // Test 4: Test exact path match
            policyMap.add('exactPolicy', '/exact/path', { role: 'admin' });
            let result4 = policyMap.matches('exactPolicy', '/exact/path', { role: 'admin' });
            assert.strictEqual(result4, true, 'Should match exact path');
            
            // Test 5: Test context mismatch
            let result5 = policyMap.matches('exactPolicy', '/exact/path', { role: 'user' });
            assert.strictEqual(result5, false, 'Should not match with different context');
            
            // Test 6: Test non-existent policy name
            let result6 = policyMap.matches('nonExistentPolicy', '/any/path', {});
            assert.strictEqual(result6, false, 'Should not match non-existent policy');
            
            // Test 7: Test with null/undefined parameters
            let result7 = policyMap.matches(null, '/test', {});
            assert.strictEqual(result7, false, 'Should handle null policy name');
            
            let result8 = policyMap.matches('testPolicy', null, {});
            assert.strictEqual(result8, false, 'Should handle null path');
            
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