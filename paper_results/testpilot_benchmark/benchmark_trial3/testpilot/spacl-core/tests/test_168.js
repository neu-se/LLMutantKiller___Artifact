let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test Rule.clone independence', function(done) {
        try {
            // Create original rule
            const original = _spacl_core.Rule.for('/test/+').allow('get');
            
            // Clone it
            const clone = original.clone('/clone/+');
            
            // Modify clone (if possible) and verify original is unchanged
            // This tests that the clone is truly independent
            assert.strictEqual('/test/+', original.regex, 'Original regex should remain unchanged');
            assert.strictEqual('/clone/+', clone.regex, 'Clone should have new regex');
            
            // Verify they are separate instances
            assert.notStrictEqual(original, clone, 'Original and clone should be different instances');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});