let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.matches edge cases', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        
        // Mock get method that returns undefined for all policies
        policyMap.get = function(name) {
            return undefined;
        };

        // Test with empty string policy name
        const result1 = policyMap.matches('', '/some/path', {});
        assert.strictEqual(result1, false, 'Should return false for empty policy name');

        // Test with null policy name
        const result2 = policyMap.matches(null, '/some/path', {});
        assert.strictEqual(result2, false, 'Should return false for null policy name');

        // Test with undefined policy name
        const result3 = policyMap.matches(undefined, '/some/path', {});
        assert.strictEqual(result3, false, 'Should return false for undefined policy name');

        done();
    });
});