let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches - context validation', function(done) {
        try {
            // Create a rule that checks context
            let rule = new _spacl_core.Rule('/api/users', 'POST', 'allow');
            
            // Test with matching context
            let ctx1 = { method: 'POST' };
            let result1 = rule.matches('/api/users', ctx1);
            assert.strictEqual(result1, true, 'Should match with correct context');
            
            // Test with non-matching context
            let ctx2 = { method: 'GET' };
            let result2 = rule.matches('/api/users', ctx2);
            assert.strictEqual(result2, false, 'Should not match with incorrect context');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })