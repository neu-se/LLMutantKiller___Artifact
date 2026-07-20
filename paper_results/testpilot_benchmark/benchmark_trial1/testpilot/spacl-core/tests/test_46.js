let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow with single verb', function(done) {
        // Create a rule and allow a single verb
        const rule = _spacl_core.Rule.for('/user/+').allow('get');
        
        // Verify the rule was created and has the expected properties
        assert(rule instanceof _spacl_core.Rule, 'Should return a Rule instance');
        
        // The allow method should return the rule instance for chaining
        const result = rule.allow('post');
        assert.strictEqual(result, rule, 'Should return the same rule instance for chaining');
        
        done();
    });

    })