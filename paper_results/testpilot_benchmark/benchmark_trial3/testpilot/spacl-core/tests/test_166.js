let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test Rule.clone with various spec types', function(done) {
        try {
            const original = _spacl_core.Rule.for('/original').allow('get');
            
            // Test with string spec
            const stringClone = original.clone('/string-spec');
            assert.strictEqual('/string-spec', stringClone.regex, 'Should handle string spec');
            
            // Test with undefined spec (should use original)
            const undefinedClone = original.clone(undefined);
            assert.strictEqual(original.regex, undefinedClone.regex, 'Should use original regex when spec is undefined');
            
            // Test cloning a clone
            const cloneOfClone = stringClone.clone('/clone-of-clone');
            assert.strictEqual('/clone-of-clone', cloneOfClone.regex, 'Should be able to clone a clone');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});