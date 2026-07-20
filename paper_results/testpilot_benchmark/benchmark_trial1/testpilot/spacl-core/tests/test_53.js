let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny with no arguments', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            let result = rule.deny();
            
            // Should still return the rule object even with no arguments
            assert.strictEqual(result, rule);
            done();
        } catch (error) {
            done(error);
        }
    });

    })