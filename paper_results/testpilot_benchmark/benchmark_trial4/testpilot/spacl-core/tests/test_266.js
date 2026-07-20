let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - no matching rule', function(done) {
        try {
            // Create a policy with no rules
            const policy = new _spacl_core.Policy();
            
            const result = policy.query('/api/unknown', 'POST', {});
            assert.strictEqual(result.effect, 'deny', 'Should default to deny when no rules match');
            done();
        } catch (error) {
            done(error);
        }
    });
});