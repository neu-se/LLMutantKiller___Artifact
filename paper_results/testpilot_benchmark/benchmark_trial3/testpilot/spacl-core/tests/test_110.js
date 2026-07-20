let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny', function(done) {
        // Test 1: Basic deny functionality with single verb
        const rule1 = _spacl_core.Rule.for('/test/path');
        rule1.deny('delete');
        assert.strictEqual(rule1.verbs.delete, false, 'Single verb should be denied');

        // Test 2: Deny multiple verbs at once
        const rule2 = _spacl_core.Rule.for('/test/path2');
        rule2.deny('put', 'post', 'delete');
        assert.strictEqual(rule2.verbs.put, false, 'PUT verb should be denied');
        assert.strictEqual(rule2.verbs.post, false, 'POST verb should be denied');
        assert.strictEqual(rule2.verbs.delete, false, 'DELETE verb should be denied');

        // Test 3: Method chaining - deny should return the rule instance
        const rule3 = _spacl_core.Rule.for('/test/path3');
        const returnedRule = rule3.deny('get');
        assert.strictEqual(returnedRule, rule3, 'deny() should return the same rule instance for chaining');

        // Test 4: Deny after allow - should override allowed verbs
        const rule4 = _spacl_core.Rule.for('/test/path4');
        rule4.allow('get', 'post');
        rule4.deny('get');
        assert.strictEqual(rule4.verbs.get, false, 'Denied verb should override previously allowed verb');
        assert.strictEqual(rule4.verbs.post, true, 'Other allowed verbs should remain unaffected');

        // Test 5: Deny with no arguments should not throw error
        const rule5 = _spacl_core.Rule.for('/test/path5');
        try {
            rule5.deny();
            assert.ok(true, 'deny() with no arguments should not throw error');
        } catch (error) {
            assert.fail('deny() with no arguments should not throw error');
        }

        // Test 6: Chain multiple deny calls
        const rule6 = _spacl_core.Rule.for('/test/path6');
        rule6.deny('get').deny('post').deny('put');
        assert.strictEqual(rule6.verbs.get, false, 'First denied verb should be false');
        assert.strictEqual(rule6.verbs.post, false, 'Second denied verb should be false');
        assert.strictEqual(rule6.verbs.put, false, 'Third denied verb should be false');

        done();
    });
});