let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - basic allow rule', function(done) {
        try {
            // Create a simple policy that allows GET requests to /api/users
            const policy = new _spacl_core.Policy();
            policy.addRule({
                effect: 'allow',
                path: '/api/users',
                verb: 'GET',
                conditions: []
            });
            
            const result = policy.query('/api/users', 'GET', {});
            assert.strictEqual(result.effect, 'allow', 'Should allow GET request to /api/users');
            done();
        } catch (error) {
            done(error);
        }
    });

    })