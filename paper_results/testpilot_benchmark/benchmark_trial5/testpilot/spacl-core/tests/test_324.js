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
            assert.notStrictEqual(originalPolicy, clonedPolicy);
            
            // Test 2: Clone with custom name
            const renamedClone = originalPolicy.clone('admin');
            assert.strictEqual(renamedClone.name, 'admin');
            assert.notStrictEqual(originalPolicy, renamedClone);
            
            // Test 3: Clone with shallow copy (deep = false)
            const shallowClone = originalPolicy.clone('shallow', false);
            assert.strictEqual(shallowClone.name, 'shallow');
            assert.notStrictEqual(originalPolicy, shallowClone);
            
            // Test 4: Verify cloned policy can be modified independently
            const modifiableClone = originalPolicy.clone('modifiable');
            modifiableClone.push(Rule.for('/admin/+').allow('delete'));
            
            // Original should not be affected by modifications to clone
            assert.notStrictEqual(originalPolicy.rules.length, modifiableClone.rules.length);
            
            // Test 5: Test the example usage pattern
            const user = Policy.for('user',
                Rule.for('/user/+').allow('get'),
                Rule.for('/user/:name').allow('put')
            );
            
            const admin = user.clone('admin').push(
                Rule.for('/user/+').allow('put', 'post', 'delete'),
                Rule.for('/user/:name').deny('delete')
            );
            
            assert.strictEqual(admin.name, 'admin');
            assert.notStrictEqual(user, admin);
            
            // Test 6: Clone empty policy
            const emptyPolicy = Policy.for('empty');
            const emptyClone = emptyPolicy.clone('empty-clone');
            assert.strictEqual(emptyClone.name, 'empty-clone');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});