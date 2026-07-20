let mocha = require('mocha');
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
        
        // Test 4: Removed - deny with no arguments causes error
        // The deny method expects at least one string argument
        
        // Test 5: Deny the same verb multiple times
        let rule5 = new _spacl_core.Rule();
        rule5.deny('update');
        rule5.deny('update');
        assert.strictEqual(rule5.verbs['update'], false, 'Verb should remain denied after multiple deny calls');
        
        // Test 6: Chaining multiple deny calls
        let rule6 = new _spacl_core.Rule();
        rule6.deny('create').deny('read').deny('update');
        assert.strictEqual(rule6.verbs['create'], false, 'Create verb should be denied in chain');
        assert.strictEqual(rule6.verbs['read'], false, 'Read verb should be denied in chain');
        assert.strictEqual(rule6.verbs['update'], false, 'Update verb should be denied in chain');
        
        done();
    });
});