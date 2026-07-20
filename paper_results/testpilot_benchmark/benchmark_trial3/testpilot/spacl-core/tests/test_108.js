let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny', function(done) {
        // Test 1: Deny a single verb
        let rule1 = new _spacl_core.Rule();
        rule1.deny('read');
        assert.strictEqual(rule1.verbs['read'], false, 'Single verb should be denied');
        
        // Test 2: Deny multiple verbs
        let rule2 = new _spacl_core.Rule();
        rule2.deny('read', 'write', 'delete');
        assert.strictEqual(rule2.verbs['read'], false, 'Read verb should be denied');
        assert.strictEqual(rule2.verbs['write'], false, 'Write verb should be denied');
        assert.strictEqual(rule2.verbs['delete'], false, 'Delete verb should be denied');
        
        // Test 3: Method chaining - deny should return the rule instance
        let rule3 = new _spacl_core.Rule();
        let returnedRule = rule3.deny('execute');
        assert.strictEqual(returnedRule, rule3, 'deny() should return the same rule instance for chaining');
        assert.strictEqual(rule3.verbs['execute'], false, 'Execute verb should be denied');
        
        // Test 4: Deny with no arguments (edge case)
        let rule4 = new _spacl_core.Rule();
        let initialVerbs = Object.keys(rule4.verbs).length;
        rule4.deny();
        assert.strictEqual(Object.keys(rule4.verbs).length, initialVerbs, 'No verbs should be added when deny() called with no arguments');
        
        // Test 5: Deny overwrites existing verb permissions
        let rule5 = new _spacl_core.Rule();
        // Assuming verbs can be set to true initially
        rule5.verbs['update'] = true;
        rule5.deny('update');
        assert.strictEqual(rule5.verbs['update'], false, 'Previously allowed verb should be denied');
        
        // Test 6: Deny duplicate verbs
        let rule6 = new _spacl_core.Rule();
        rule6.deny('create', 'create', 'create');
        assert.strictEqual(rule6.verbs['create'], false, 'Duplicate verbs should still result in denial');
        
        done();
    });
});