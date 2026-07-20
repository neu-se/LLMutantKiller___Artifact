let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.matches', function(done) {
        // Create a mock policy object
        const mockPolicy = {
            matches: function(path, ctx) {
                // Simple mock implementation - returns true if path starts with '/allowed'
                return path.startsWith('/allowed');
            }
        };

        // Create a PolicyMap instance
        const policyMap = new _spacl_core.PolicyMap();
        
        // Mock the get method to return our mock policy for 'testPolicy'
        policyMap.get = function(name) {
            if (name === 'testPolicy') {
                return mockPolicy;
            }
            return undefined;
        };

        // Test case 1: Policy exists and matches
        const result1 = policyMap.matches('testPolicy', '/allowed/resource', {});
        assert.strictEqual(result1, true, 'Should return true when policy exists and matches');

        // Test case 2: Policy exists but doesn't match
        const result2 = policyMap.matches('testPolicy', '/denied/resource', {});
        assert.strictEqual(result2, false, 'Should return false when policy exists but doesn\'t match');

        // Test case 3: Policy doesn't exist
        const result3 = policyMap.matches('nonExistentPolicy', '/any/path', {});
        assert.strictEqual(result3, false, 'Should return false when policy doesn\'t exist');

        done();
    });

    })