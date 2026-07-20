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
            policyMap.add('testPolicy', '/test/*', { action: 'allow' });
            let result2 = policyMap.matches('testPolicy', '/test/path', {});
            assert.strictEqual(result2, true, 'Should match wildcard path');
            
            // Test 3: Test non-matching path
            let result3 = policyMap.matches('testPolicy', '/other/path', {});
            assert.strictEqual(result3, false, 'Should not match different path');
            
            // Test 4: Test non-existing policy name
            let result4 = policyMap.matches('nonExistentPolicy', '/test/path', {});
            assert.strictEqual(result4, false, 'Should not match non-existent policy');
            
            // Test 5: Test exact path match
            policyMap.add('exactPolicy', '/exact/path', { action: 'deny' });
            let result5 = policyMap.matches('exactPolicy', '/exact/path', {});
            assert.strictEqual(result5, true, 'Should match exact path');
            
            // Test 6: Test with context
            policyMap.add('contextPolicy', '/api/*', { action: 'allow', role: 'admin' });
            let result6 = policyMap.matches('contextPolicy', '/api/users', { role: 'admin' });
            assert.strictEqual(result6, true, 'Should match with context');
            
            // Test 7: Test with non-matching context
            let result7 = policyMap.matches('contextPolicy', '/api/users', { role: 'user' });
            assert.strictEqual(result7, false, 'Should not match with wrong context');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })