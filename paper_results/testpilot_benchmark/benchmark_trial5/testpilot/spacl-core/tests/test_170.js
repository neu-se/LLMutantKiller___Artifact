let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test Rule.clone with various spec types', function(done) {
        try {
            const original = _spacl_core.Rule.for('/original').allow('get');
            
            // Test with undefined (should use default)
            const clone1 = original.clone(undefined);
            assert.strictEqual(original.regex, clone1.regex, 'Clone with undefined should use original regex');
            
            // Test with different string patterns
            const clone2 = original.clone('/api/v1/users/+');
            assert.strictEqual('/api/v1/users/+', clone2.regex, 'Clone should accept complex path patterns');
            
            const clone3 = original.clone('/user/:id/profile');
            assert.strictEqual('/user/:id/profile', clone3.regex, 'Clone should accept parameterized paths');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});