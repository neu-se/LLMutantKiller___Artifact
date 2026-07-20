let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny', function(done) {
        // Test 1: deny a single verb
        let rule1 = new _spacl_core.Rule();
        rule1.deny('read');
        assert.strictEqual(rule1.verbs['read'], false, 'Single verb should be denied');
        
        // Test 2: deny multiple verbs
        let rule2 = new _spacl_core.Rule();
        rule2.deny('read', 'write', 'delete');
        assert.strictEqual(rule2.verbs['read'], false, 'Read verb should be denied');
        assert.strictEqual(rule2.verbs['write'], false, 'Write verb should be denied');
        assert.strictEqual(rule2.verbs['delete'], false, 'Delete verb should be denied');
        
        // Test 3: deny should return the rule instance for chaining
        let rule3 = new _spacl_core.Rule();
        let result = rule3.deny('execute');
        assert.strictEqual(result, rule3, 'deny should return the rule instance');
        assert.strictEqual(rule3.verbs['execute'], false, 'Execute verb should be denied');
        
        // Test 4: deny should work with method chaining
        let rule4 = new _spacl_core.Rule();
        rule4.deny('create').deny('update');
        assert.strictEqual(rule4.verbs['create'], false, 'Create verb should be denied');
        assert.strictEqual(rule4.verbs['update'], false, 'Update verb should be denied');
        
        // Test 5: deny with no arguments should not throw error
        let rule5 = new _spacl_core.Rule();
        try {
            rule5.deny();
            assert.ok(true, 'deny with no arguments should not throw error');
        } catch (error) {
            assert.fail('deny with no arguments should not throw error');
        }
        
        // Test 6: deny should overwrite existing verb permissions
        let rule6 = new _spacl_core.Rule();
        rule6.verbs['admin'] = true; // Set to true first
        rule6.deny('admin');
        assert.strictEqual(rule6.verbs['admin'], false, 'deny should overwrite existing true permission');
        
        done();
    });
});