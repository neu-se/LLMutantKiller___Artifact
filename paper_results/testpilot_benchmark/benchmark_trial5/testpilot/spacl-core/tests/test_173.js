let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone', function(done) {
        try {
            // Test 1: Clone with default spec (should use original regex)
            const originalRule = _spacl_core.Rule.for('/user/+').allow('get');
            const clonedRule1 = originalRule.clone();
            
            // Verify the clone is a different object
            assert.notStrictEqual(originalRule, clonedRule1, 'Clone should be a different object');
            
            // Verify the clone has the same regex pattern
            assert.strictEqual(originalRule.regex, clonedRule1.regex, 'Clone should have same regex when no spec provided');
            
            // Test 2: Clone with custom spec
            const clonedRule2 = originalRule.clone('/admin/+');
            
            // Verify the clone is a different object
            assert.notStrictEqual(originalRule, clonedRule2, 'Clone with custom spec should be a different object');
            
            // Verify the clone has the new regex pattern
            assert.strictEqual('/admin/+', clonedRule2.regex, 'Clone should have new regex when spec provided');
            assert.notStrictEqual(originalRule.regex, clonedRule2.regex, 'Clone should have different regex from original');
            
            // Test 3: Clone preserves other properties (if any)
            const ruleWithMultipleActions = _spacl_core.Rule.for('/user/:id').allow('get', 'put');
            const clonedRule3 = ruleWithMultipleActions.clone('/admin/:id');
            
            // Verify it's a proper Rule instance
            assert(clonedRule3 instanceof _spacl_core.Rule, 'Clone should be an instance of Rule');
            
            // Test 4: Clone with empty string spec
            const clonedRule4 = originalRule.clone('');
            assert.strictEqual('', clonedRule4.regex, 'Clone should accept empty string as spec');
            
            // Test 5: Clone with null spec should use original regex
            const clonedRule5 = originalRule.clone(null);
            assert.strictEqual(originalRule.regex, clonedRule5.regex, 'Clone with null spec should use original regex');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
});