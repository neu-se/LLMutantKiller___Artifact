let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - multiple rules precedence', function(done) {
        try {
            // Create a policy with multiple rules where deny takes precedence
            const policy = new _spacl_core.Policy();
            policy.addRule({
                effect: 'allow',
                path: '/api/*',
                verb: 'GET',
                conditions: []
            });
            policy.addRule({
                effect: 'deny',
                path: '/api/admin',
                verb: 'GET',
                conditions: []
            });
            
            const allowResult = policy.query('/api/users', 'GET', {});
            const denyResult = policy.query('/api/admin', 'GET', {});
            
            assert.strictEqual(allowResult.effect, 'allow', 'Should allow GET to /api/users');
            assert.strictEqual(denyResult.effect, 'deny', 'Should deny GET to /api/admin (deny takes precedence)');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});