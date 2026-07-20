let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.matches with different contexts', function(done) {
        // Create a more sophisticated mock policy that uses context
        const contextAwarePolicy = {
            matches: function(path, ctx) {
                // Returns true if user role is 'admin' or path is public
                return (ctx && ctx.role === 'admin') || path.startsWith('/public');
            }
        };

        const policyMap = new _spacl_core.PolicyMap();
        
        policyMap.get = function(name) {
            if (name === 'contextPolicy') {
                return contextAwarePolicy;
            }
            return undefined;
        };

        // Test case 1: Admin user accessing private resource
        const result1 = policyMap.matches('contextPolicy', '/private/data', { role: 'admin' });
        assert.strictEqual(result1, true, 'Admin should access private resources');

        // Test case 2: Regular user accessing public resource
        const result2 = policyMap.matches('contextPolicy', '/public/info', { role: 'user' });
        assert.strictEqual(result2, true, 'Any user should access public resources');

        // Test case 3: Regular user accessing private resource
        const result3 = policyMap.matches('contextPolicy', '/private/data', { role: 'user' });
        assert.strictEqual(result3, false, 'Regular user should not access private resources');

        // Test case 4: No context provided
        const result4 = policyMap.matches('contextPolicy', '/private/data', null);
        assert.strictEqual(result4, false, 'Should handle null context gracefully');

        done();
    });

    })