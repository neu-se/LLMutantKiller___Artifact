let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches - empty and null inputs', function(done) {
        try {
            let rule = new _spacl_core.Rule('/api/users', 'GET', 'allow');
            let ctx = { method: 'GET' };
            
            // Test with empty path
            let result1 = rule.matches('', ctx);
            assert.strictEqual(result1, false, 'Should not match empty path');
            
            // Test with null path
            let result2 = rule.matches(null, ctx);
            assert.strictEqual(result2, false, 'Should not match null path');
            
            // Test with null context
            let result3 = rule.matches('/api/users', null);
            assert.strictEqual(result3, false, 'Should not match with null context');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })