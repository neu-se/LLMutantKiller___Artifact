let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - no matching rule', function(done) {
        try {
            // Create a policy with no rules
            const policy = new _spacl_core.Policy();
            
            const result = policy.query('/api/nonexistent', 'GET', {});
            // Should return default deny or undefined effect
            assert.ok(result.effect === 'deny' || result.effect === undefined);
            done();
        } catch (error) {
            done(error);
        }
    });

    })