let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone', function(done) {
        // Test 1: Clone with default spec (should use original regex)
        const originalRule = _spacl_core.Rule.for('/user/+');
        originalRule.allow('get', 'post');
        originalRule.deny('delete');
        
        const clonedRule = originalRule.clone();
        
        // Verify the cloned rule has the same regex spec
        assert.strictEqual(clonedRule.regex.spec, originalRule.regex.spec);
        
        // Verify the verbs are copied
        assert.deepStrictEqual(clonedRule.verbs, originalRule.verbs);
        
        // Verify they are different objects
        assert.notStrictEqual(clonedRule, originalRule);
        assert.notStrictEqual(clonedRule.verbs, originalRule.verbs);
        
        // Test 2: Clone with custom spec
        const customClone = originalRule.clone('/admin/+');
        
        // Verify the cloned rule has the new regex spec
        assert.strictEqual(customClone.regex.spec, '/admin/+');
        
        // Verify the verbs are still copied from original
        assert.deepStrictEqual(customClone.verbs, originalRule.verbs);
        
        // Test 3: Verify independence - modifying clone doesn't affect original
        customClone.allow('patch');
        
        // Original should not have 'patch' verb
        assert.strictEqual(originalRule.verbs.patch, undefined);
        
        // Clone should have 'patch' verb
        assert.notStrictEqual(customClone.verbs.patch, undefined);
        
        // Test 4: Clone empty rule
        const emptyRule = new _spacl_core.Rule('/empty');
        const emptyClone = emptyRule.clone();
        
        assert.strictEqual(emptyClone.regex.spec, '/empty');
        assert.deepStrictEqual(emptyClone.verbs, {});
        
        // Test 5: Clone with different spec and verify original verbs are preserved
        const sourceRule = _spacl_core.Rule.for('/source');
        sourceRule.allow('get').deny('post');
        
        const targetClone = sourceRule.clone('/target');
        
        assert.strictEqual(targetClone.regex.spec, '/target');
        assert.deepStrictEqual(targetClone.verbs, sourceRule.verbs);
        
        done();
    });
});