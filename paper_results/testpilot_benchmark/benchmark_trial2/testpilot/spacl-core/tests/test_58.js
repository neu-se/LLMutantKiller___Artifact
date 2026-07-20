let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny', function(done) {
        // Test 1: Basic deny functionality with single verb
        let rule1 = _spacl_core.Rule.for('/test/path');
        rule1.deny('delete');
        assert.strictEqual(rule1.verbs.delete, false, 'Single verb should be denied');
        
        // Test 2: Deny multiple verbs at once
        let rule2 = _spacl_core.Rule.for('/test/path2');
        rule2.deny('put', 'post', 'delete');
        assert.strictEqual(rule2.verbs.put, false, 'PUT verb should be denied');
        assert.strictEqual(rule2.verbs.post, false, 'POST verb should be denied');
        assert.strictEqual(rule2.verbs.delete, false, 'DELETE verb should be denied');
        
        // Test 3: Method chaining - deny should return the rule instance
        let rule3 = _spacl_core.Rule.for('/test/path3');
        let returnedRule = rule3.deny('get');
        assert.strictEqual(returnedRule, rule3, 'deny() should return the same rule instance for chaining');
        assert.strictEqual(rule3.verbs.get, false, 'GET verb should be denied');
        
        // Test 4: Deny after allow - should override previous allow
        let rule4 = _spacl_core.Rule.for('/test/path4');
        rule4.allow('get', 'post');
        assert.strictEqual(rule4.verbs.get, true, 'GET should initially be allowed');
        assert.strictEqual(rule4.verbs.post, true, 'POST should initially be allowed');
        
        rule4.deny('get');
        assert.strictEqual(rule4.verbs.get, false, 'GET should be denied after deny() call');
        assert.strictEqual(rule4.verbs.post, true, 'POST should still be allowed');
        
        // Test 5: Chaining deny with other methods
        let rule5 = _spacl_core.Rule.for('/test/path5');
        rule5.allow('get', 'put').deny('delete', 'post').allow('patch');
        assert.strictEqual(rule5.verbs.get, true, 'GET should be allowed');
        assert.strictEqual(rule5.verbs.put, true, 'PUT should be allowed');
        assert.strictEqual(rule5.verbs.delete, false, 'DELETE should be denied');
        assert.strictEqual(rule5.verbs.post, false, 'POST should be denied');
        assert.strictEqual(rule5.verbs.patch, true, 'PATCH should be allowed');
        
        // Test 6: Empty deny call (edge case)
        let rule6 = _spacl_core.Rule.for('/test/path6');
        rule6.allow('get');
        let originalGetValue = rule6.verbs.get;
        rule6.deny(); // No arguments
        assert.strictEqual(rule6.verbs.get, originalGetValue, 'No verbs should be affected when deny() called with no arguments');
        
        done();
    });
});