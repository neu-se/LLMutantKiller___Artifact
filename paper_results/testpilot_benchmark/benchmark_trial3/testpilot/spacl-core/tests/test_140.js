let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches - with context validation', function(done) {
        try {
            // Create a rule that might check context properties
            let rule = new _spacl_core.Rule('/api/users', 'POST', 'allow');
            
            // Test with matching context
            let ctx1 = { method: 'POST', user: 'admin' };
            let result1 = rule.matches('/api/users', ctx1);
            assert.strictEqual(typeof result1, 'boolean', 'Should return boolean result');
            
            // Test with different context
            let ctx2 = { method: 'GET', user: 'guest' };
            let result2 = rule.matches('/api/users', ctx2);
            assert.strictEqual(typeof result2, 'boolean', 'Should return boolean result');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })