let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - basic allow rule', function(done) {
        try {
            // Create a simple policy that allows GET requests to /api/users
            const policy = new _spacl_core.Policy();
            
            // Use the correct method to add a rule (likely 'add' instead of 'addRule')
            policy.add({
                effect: 'allow',
                path: '/api/users',
                verb: 'GET',
                conditions: []
            });
            
            const result = policy.query('/api/users', 'GET', {});
            assert.strictEqual(result.effect, 'allow');
            done();
        } catch (error) {
            done(error);
        }
    });
});