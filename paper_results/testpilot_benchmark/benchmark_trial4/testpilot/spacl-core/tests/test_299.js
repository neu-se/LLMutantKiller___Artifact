let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone', function(done) {
        // Test 1: Clone with default parameters (deep clone, same name)
        const rule1 = _spacl_core.Rule.for('/user/+').allow('get');
        const rule2 = _spacl_core.Rule.for('/user/:name').allow('put');
        const originalPolicy = _spacl_core.Policy.for('user', rule1, rule2);
        
        const clonedPolicy = originalPolicy.clone();
        
        // Should have same name
        assert.strictEqual(clonedPolicy.name, 'user');
        
        // Should have same number of rules
        assert.strictEqual(clonedPolicy.rules.length, originalPolicy.rules.length);
        
        // Rules should be deep cloned (different objects but same content)
        assert.notStrictEqual(clonedPolicy.rules[0], originalPolicy.rules[0]);
        assert.notStrictEqual(clonedPolicy.rules[1], originalPolicy.rules[1]);
        
        // Test 2: Clone with custom name
        const renamedClone = originalPolicy.clone('admin');
        assert.strictEqual(renamedClone.name, 'admin');
        assert.strictEqual(renamedClone.rules.length, originalPolicy.rules.length);
        
        // Test 3: Shallow clone
        const shallowClone = originalPolicy.clone('shallow', false);
        assert.strictEqual(shallowClone.name, 'shallow');
        assert.strictEqual(shallowClone.rules.length, originalPolicy.rules.length);
        
        // Rules should be the same objects (shallow copy)
        assert.strictEqual(shallowClone.rules[0], originalPolicy.rules[0]);
        assert.strictEqual(shallowClone.rules[1], originalPolicy.rules[1]);
        
        // Test 4: Clone empty policy
        const emptyPolicy = new _spacl_core.Policy('empty');
        const emptyClone = emptyPolicy.clone('emptyClone');
        assert.strictEqual(emptyClone.name, 'emptyClone');
        assert.strictEqual(emptyClone.rules.length, 0);
        
        // Test 5: Verify cloned policy can be modified independently
        const modifiableClone = originalPolicy.clone('modifiable');
        const newRule = _spacl_core.Rule.for('/admin/+').allow('delete');
        modifiableClone.push(newRule);
        
        // Original should be unchanged
        assert.strictEqual(originalPolicy.rules.length, 2);
        assert.strictEqual(modifiableClone.rules.length, 3);
        
        done();
    });
});