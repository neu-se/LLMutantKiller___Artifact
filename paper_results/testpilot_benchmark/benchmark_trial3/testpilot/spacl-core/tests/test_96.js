let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow with single verb', function(done) {
        // Create a rule and allow a single verb
        const rule = _spacl_core.Rule.for('/user/+').allow('get');
        
        // Verify the rule was created successfully
        assert(rule instanceof _spacl_core.Rule, 'Rule should be an instance of Rule');
        
        // The allow method should return the rule instance for chaining
        assert.strictEqual(rule.constructor.name, 'Rule', 'Should return a Rule instance');
        
        done();
    });

    })