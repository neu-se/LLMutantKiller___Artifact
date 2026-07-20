let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test PolicyMap edge cases', function(done) {
        try {
            let policyMap = new _spacl_core.PolicyMap();
            
            // Test with null/undefined parameters
            let result1 = policyMap.matches(null, '/test', {});
            assert.strictEqual(result1, false, 'Should handle null name');
            
            let result2 = policyMap.matches('test', null, {});
            assert.strictEqual(result2, false, 'Should handle null path');
            
            let result3 = policyMap.matches('test', '/test', null);
            assert.strictEqual(result3, false, 'Should handle null context');
            
            // Test with empty strings
            let result4 = policyMap.matches('', '/test', {});
            assert.strictEqual(result4, false, 'Should handle empty name');
            
            let result5 = policyMap.matches('test', '', {});
            assert.strictEqual(result5, false, 'Should handle empty path');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })