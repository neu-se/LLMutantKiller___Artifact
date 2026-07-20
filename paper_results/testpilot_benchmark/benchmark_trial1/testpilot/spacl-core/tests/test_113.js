let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone', function(done) {
        try {
            const { Rule, Policy } = _spacl_core;
            
            // Test 1: Clone with default parameters (same name, deep clone)
            const originalPolicy = Policy.for('user',
                Rule.for('/user/+').allow('get'),
                Rule.for('/user/:name').allow('put')
            );
            
            const clonedDefault = originalPolicy.clone();
            
            assert.strictEqual(clonedDefault.name, 'user', 'Default clone should preserve name');
            assert.strictEqual(clonedDefault.rules.length, originalPolicy.rules.length, 'Default clone should have same number of rules');
            assert.notStrictEqual(clonedDefault, originalPolicy, 'Clone should be a different object');
            assert.notStrictEqual(clonedDefault.rules[0], originalPolicy.rules[0], 'Deep clone should create new rule objects');
            
            // Test 2: Clone with new name and deep clone
            const clonedWithNewName = originalPolicy.clone('admin');
            
            assert.strictEqual(clonedWithNewName.name, 'admin', 'Clone should have new name');
            assert.strictEqual(clonedWithNewName.rules.length, originalPolicy.rules.length, 'Clone should have same number of rules');
            assert.notStrictEqual(clonedWithNewName.rules[0], originalPolicy.rules[0], 'Deep clone should create new rule objects');
            
            // Test 3: Shallow clone (deep = false)
            const shallowClone = originalPolicy.clone('shallow', false);
            
            assert.strictEqual(shallowClone.name, 'shallow', 'Shallow clone should have specified name');
            assert.strictEqual(shallowClone.rules.length, originalPolicy.rules.length, 'Shallow clone should have same number of rules');
            assert.strictEqual(shallowClone.rules[0], originalPolicy.rules[0], 'Shallow clone should reference same rule objects');
            
            // Test 4: Clone empty policy
            const emptyPolicy = new Policy('empty');
            const clonedEmpty = emptyPolicy.clone('cloned-empty');
            
            assert.strictEqual(clonedEmpty.name, 'cloned-empty', 'Empty policy clone should have new name');
            assert.strictEqual(clonedEmpty.rules.length, 0, 'Empty policy clone should have no rules');
            
            // Test 5: Verify independence of deep cloned rules
            const testPolicy = Policy.for('test', Rule.for('/test').allow('get'));
            const deepClone = testPolicy.clone('deep-test', true);
            
            // Modify original policy by adding a rule
            testPolicy.push(Rule.for('/new').allow('post'));
            
            assert.strictEqual(testPolicy.rules.length, 2, 'Original policy should have 2 rules after modification');
            assert.strictEqual(deepClone.rules.length, 1, 'Deep clone should still have 1 rule after original modification');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});