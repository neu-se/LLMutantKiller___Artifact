let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone', function(done) {
        try {
            const { Rule, Policy } = _spacl_core;
            
            // Test 1: Basic clone with default parameters
            const originalPolicy = Policy.for('user',
                Rule.for('/user/+').allow('get'),
                Rule.for('/user/:name').allow('put')
            );
            
            const clonedPolicy = originalPolicy.clone();
            
            // Should have same name by default
            assert.strictEqual(clonedPolicy.name, 'user');
            
            // Should have same number of rules
            assert.strictEqual(clonedPolicy.rules.length, originalPolicy.rules.length);
            
            // Rules should be deep cloned (different objects)
            assert.notStrictEqual(clonedPolicy.rules[0], originalPolicy.rules[0]);
            assert.notStrictEqual(clonedPolicy.rules[1], originalPolicy.rules[1]);
            
            // Test 2: Clone with different name
            const renamedClone = originalPolicy.clone('admin');
            assert.strictEqual(renamedClone.name, 'admin');
            assert.strictEqual(renamedClone.rules.length, originalPolicy.rules.length);
            
            // Test 3: Shallow clone (deep = false)
            const shallowClone = originalPolicy.clone('shallow', false);
            assert.strictEqual(shallowClone.name, 'shallow');
            assert.strictEqual(shallowClone.rules.length, originalPolicy.rules.length);
            
            // Rules should be the same objects (shallow copy)
            assert.strictEqual(shallowClone.rules[0], originalPolicy.rules[0]);
            assert.strictEqual(shallowClone.rules[1], originalPolicy.rules[1]);
            
            // Test 4: Deep clone (deep = true, explicit)
            const deepClone = originalPolicy.clone('deep', true);
            assert.strictEqual(deepClone.name, 'deep');
            assert.strictEqual(deepClone.rules.length, originalPolicy.rules.length);
            
            // Rules should be different objects (deep copy)
            assert.notStrictEqual(deepClone.rules[0], originalPolicy.rules[0]);
            assert.notStrictEqual(deepClone.rules[1], originalPolicy.rules[1]);
            
            // Test 5: Clone empty policy
            const emptyPolicy = new Policy('empty');
            const emptyClone = emptyPolicy.clone('emptyClone');
            assert.strictEqual(emptyClone.name, 'emptyClone');
            assert.strictEqual(emptyClone.rules.length, 0);
            
            // Test 6: Verify cloned policy is independent
            const testPolicy = Policy.for('test', Rule.for('/test').allow('get'));
            const independentClone = testPolicy.clone('independent');
            
            // Modify original policy
            testPolicy.push(Rule.for('/new').allow('post'));
            
            // Clone should not be affected
            assert.strictEqual(testPolicy.rules.length, 2);
            assert.strictEqual(independentClone.rules.length, 1);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});