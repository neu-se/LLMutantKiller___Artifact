let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow', function(done) {
        // Test 1: Allow a single verb
        let rule1 = _spacl_core.Rule.for('/test/path');
        let result1 = rule1.allow('get');
        
        // Should return the rule instance for chaining
        assert.strictEqual(result1, rule1);
        
        // Should have the verb set to true
        assert.strictEqual(rule1.verbs.get, true);
        
        // Test 2: Allow multiple verbs at once
        let rule2 = _spacl_core.Rule.for('/test/path2');
        rule2.allow('get', 'post', 'put');
        
        assert.strictEqual(rule2.verbs.get, true);
        assert.strictEqual(rule2.verbs.post, true);
        assert.strictEqual(rule2.verbs.put, true);
        
        // Test 3: Allow verbs on a rule that already has some verbs
        let rule3 = _spacl_core.Rule.for('/test/path3');
        rule3.allow('get');
        rule3.allow('post', 'delete');
        
        assert.strictEqual(rule3.verbs.get, true);
        assert.strictEqual(rule3.verbs.post, true);
        assert.strictEqual(rule3.verbs.delete, true);
        
        // Test 4: Allow the same verb multiple times (should not cause issues)
        let rule4 = _spacl_core.Rule.for('/test/path4');
        rule4.allow('get');
        rule4.allow('get'); // Allow same verb again
        
        assert.strictEqual(rule4.verbs.get, true);
        
        // Test 5: Verify that unspecified verbs are not set
        let rule5 = _spacl_core.Rule.for('/test/path5');
        rule5.allow('get');
        
        assert.strictEqual(rule5.verbs.get, true);
        assert.strictEqual(rule5.verbs.post, undefined);
        assert.strictEqual(rule5.verbs.put, undefined);
        
        // Test 6: Method chaining works correctly
        let rule6 = _spacl_core.Rule.for('/test/path6');
        let chainResult = rule6.allow('get').allow('post').allow('put');
        
        assert.strictEqual(chainResult, rule6);
        assert.strictEqual(rule6.verbs.get, true);
        assert.strictEqual(rule6.verbs.post, true);
        assert.strictEqual(rule6.verbs.put, true);
        
        done();
    });
});