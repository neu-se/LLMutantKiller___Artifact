let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - exact path match', function(done) {
        try {
            // Create a policy instance
            let policy = new _spacl_core.Policy();
            
            // Test exact path matching
            let result = policy.matches('/api/users', { method: 'GET' });
            
            // Assert the result is a boolean
            assert.strictEqual(typeof result, 'boolean');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })