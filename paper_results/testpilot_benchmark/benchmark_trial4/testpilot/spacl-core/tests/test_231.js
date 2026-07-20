let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - return value', function(done) {
        try {
            const policy = new _spacl_core.Policy();
            const rule = { action: 'allow', resource: 'test' };
            
            const result = policy.push(rule);
            
            // Verify return value (typically the new length for array-like push)
            assert.strictEqual(typeof result, 'number');
            assert.strictEqual(result, policy.length);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});