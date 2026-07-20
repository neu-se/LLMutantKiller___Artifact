let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.matches', function(done) {
        // Create a mock policy object
        const mockPolicy = {
            matches: function(path, ctx) {
                return path === '/allowed' && ctx.user === 'admin';
            }
        };

        // Create a PolicyMap instance
        const policyMap = new _spacl_core.PolicyMap();
        
        // Mock the get method to return our mock policy
        policyMap.get = function(name) {
            if (name === 'testPolicy') {
                return mockPolicy;
            }
            return undefined;
        };

        // Test case 1: Policy exists and matches
        const result1 = policyMap.matches('testPolicy', '/allowed', { user: 'admin' });
        assert.strictEqual(result1, true, 'Should return true when policy exists and matches');

        // Test case 2: Policy exists but doesn't match (wrong path)
        const result2 = policyMap.matches('testPolicy', '/denied', { user: 'admin' });
        assert.strictEqual(result2, false, 'Should return false when policy exists but path doesn\'t match');

        // Test case 3: Policy exists but doesn't match (wrong context)
        const result3 = policyMap.matches('testPolicy', '/allowed', { user: 'guest' });
        assert.strictEqual(result3, false, 'Should return false when policy exists but context doesn\'t match');

        // Test case 4: Policy doesn't exist
        const result4 = policyMap.matches('nonExistentPolicy', '/allowed', { user: 'admin' });
        assert.strictEqual(result4, false, 'Should return false when policy doesn\'t exist');

        // Test case 5: Policy name is null/undefined
        const result5 = policyMap.matches(null, '/allowed', { user: 'admin' });
        assert.strictEqual(result5, false, 'Should return false when policy name is null');

        const result6 = policyMap.matches(undefined, '/allowed', { user: 'admin' });
        assert.strictEqual(result6, false, 'Should return false when policy name is undefined');

        done();
    });

    })