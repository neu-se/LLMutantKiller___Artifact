let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow with single verb', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            let result = rule.allow('read');
            
            // Test that the method returns the rule instance for chaining
            assert.strictEqual(result, rule, 'allow() should return the rule instance');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })