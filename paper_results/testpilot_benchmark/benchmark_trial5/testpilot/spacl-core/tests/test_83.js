let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow with no arguments', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            let result = rule.allow();
            
            // Test that the method handles empty arguments gracefully
            assert.strictEqual(result, rule, 'allow() should return the rule instance even with no arguments');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })