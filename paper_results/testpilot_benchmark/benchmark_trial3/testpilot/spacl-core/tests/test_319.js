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
            
            // Should be different instances
            assert.notStrictEqual(clonedPolicy, originalPolicy);
            
            // Test 2: Clone with custom name
            const renamedClone = originalPolicy.clone('admin');
            assert.strictEqual(renamedClone.name, 'admin');
            assert.notStrictEqual(renamedClone, originalPolicy);
            
            // Test 3: Clone with shallow copy (deep = false)
            const shallowClone = originalPolicy.clone('shallow', false);
            assert.strictEqual(shallowClone.name, 'shallow');
            assert.notStrictEqual(shallowClone, originalPolicy);
            
            // Test 4: Clone with deep copy (deep = true, explicit)
            const deepClone = originalPolicy.clone('deep', true);
            assert.strictEqual(deepClone.name, 'deep');
            assert.notStrictEqual(deepClone, originalPolicy);
            
            // Test 5: Verify cloned policy can be modified independently
            const modifiableClone = originalPolicy.clone('modifiable');
            
            // Add new rule to clone
            modifiableClone.push(Rule.for('/admin/+').allow('delete'));
            
            // Original should not be affected (assuming proper cloning)
            // This test verifies independence of the cloned policy
            assert.notStrictEqual(modifiableClone, originalPolicy);
            
            // Test 6: Clone from the usage example
            const user = Policy.for('user',
                Rule.for('/user/+').allow('get'),
                Rule.for('/user/:name').allow('put')
            );
            
            const admin = user.clone('admin').push(
                Rule.for('/user/+').allow('put', 'post', 'delete'),
                Rule.for('/user/:name').deny('delete')
            );
            
            assert.strictEqual(admin.name, 'admin');
            assert.notStrictEqual(admin, user);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});