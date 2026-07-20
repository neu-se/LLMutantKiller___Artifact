let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - with context parameters', function(done) {
        try {
            let policy = new _spacl_core.Policy();
            
            // Test with various context parameters
            let context = {
                method: 'POST',
                user: 'testuser',
                role: 'admin'
            };
            
            let result = policy.matches('/admin/dashboard', context);
            
            assert.strictEqual(typeof result, 'boolean');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })