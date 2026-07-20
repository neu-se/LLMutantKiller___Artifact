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
        let rule2 = _spacl_core.Rule.for('/another/path');
        rule2.allow('get', 'post', 'put');
        
        assert.strictEqual(rule2.verbs.get, true);
        assert.strictEqual(rule2.verbs.post, true);
        assert.strictEqual(rule2.verbs.put, true);
        
        // Test 3: Allow verbs that already exist (should not overwrite)
        let rule3 = _spacl_core.Rule.for('/existing/path');
        rule3.verbs.delete = true; // Pre-existing verb
        rule3.allow('delete', 'patch');
        
        assert.strictEqual(rule3.verbs.delete, true);
        assert.strictEqual(rule3.verbs.patch, true);
        
        // Test 4: Allow with no verbs (edge case)
        let rule4 = _spacl_core.Rule.for('/empty/path');
        let originalVerbs = Object.keys(rule4.verbs).length;
        rule4.allow();
        
        // Should not change the verbs object
        assert.strictEqual(Object.keys(rule4.verbs).length, originalVerbs);
        
        // Test 5: Chaining multiple allow calls
        let rule5 = _spacl_core.Rule.for('/chain/path');
        rule5.allow('get').allow('post').allow('put', 'delete');
        
        assert.strictEqual(rule5.verbs.get, true);
        assert.strictEqual(rule5.verbs.post, true);
        assert.strictEqual(rule5.verbs.put, true);
        assert.strictEqual(rule5.verbs.delete, true);
        
        done();
    });
});