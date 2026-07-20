let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - edge cases', function(done) {
        try {
            let policy = new _spacl_core.Policy();
            
            // Test with empty path
            let result1 = policy.matches('', {});
            assert.strictEqual(typeof result1, 'boolean');
            
            // Test with null context
            let result2 = policy.matches('/test', null);
            assert.strictEqual(typeof result2, 'boolean');
            
            // Test with undefined context
            let result3 = policy.matches('/test', undefined);
            assert.strictEqual(typeof result3, 'boolean');
            
            // Test with root path
            let result4 = policy.matches('/', {});
            assert.strictEqual(typeof result4, 'boolean');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })