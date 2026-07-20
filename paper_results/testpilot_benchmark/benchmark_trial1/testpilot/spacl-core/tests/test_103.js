let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - single rule', function(done) {
        try {
            const policy = new _spacl_core.Policy();
            const rule = { action: 'allow', resource: 'test' };
            
            const result = policy.push(rule);
            
            // Verify the rule was added - use rules property or similar instead of length
            assert.strictEqual(policy.rules.length, 1);
            assert.deepStrictEqual(policy.rules[0], rule);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});