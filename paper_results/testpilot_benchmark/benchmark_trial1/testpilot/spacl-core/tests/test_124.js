```javascript
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - single policy', function(done) {
        try {
            // Create initial policy
            const userPolicy = _spacl_core.Policy.for('user',
                _spacl_core.Rule.for('/user/+').allow('get'),
                _spacl_core.Rule.for('/user/:name').allow('put')
            );
            
            // Create policy map and add initial policy
            const policyMap = new _spacl_core.PolicyMap();
            policyMap.push(userPolicy);
            
            // Verify policy was added
            assert.strictEqual(policyMap.size, 1);
            assert.ok(policyMap.has('user'));
            assert.strictEqual(policyMap.get('user'), userPolicy);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.PolicyMap.prototype.push - multiple policies', function(done) {
        try {
            // Create multiple policies
            const userPolicy = _spacl_core.Policy.for('user',
                _spacl_core.Rule.for('/user/+').allow('get')
            );
            
            const adminPolicy = _spacl_core.Policy.for('admin',
                _spacl_core.Rule.for('/user/+').allow('get', 'post', 'put', 'delete')
            );
            
            const guestPolicy = _spacl_core.Policy.for('guest',
                _spacl_core.Rule.for('/user/+').allow('get')
            );
            
            // Create policy map and add multiple policies at once
            const policyMap = new _spacl_core.PolicyMap();
            policyMap.push(userPolicy, adminPolicy, guestPolicy);
            
            // Verify all policies were added
            assert.strictEqual(policyMap.size, 3);
            assert.ok(policyMap.has('user'));
            assert.ok(policyMap.has('admin'));
            assert.ok(policyMap.has('guest'));
            assert.strictEqual(policyMap.get('user'), userPolicy);
            assert.strictEqual(policyMap.get('admin'), adminPolicy);
            assert.strictEqual(policyMap.get('guest'), guestPolicy);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.PolicyMap.prototype.push - adding to existing policies', function(done) {
        try {
            // Create initial policy
            const userPolicy = _spacl_core.Policy.for('user',
                _spacl_core.Rule.for('/user/+').allow('get')
            );
            
            // Create policy map with initial policy
            const policyMap = new _spacl_core.PolicyMap();
            policyMap.push(userPolicy);
            
            // Add another policy
            const adminPolicy = _spacl_core.Policy.for('admin',
                _spacl_core.Rule.for('/user/+').allow('get', 'post', 'put', 'delete')
            );
            policyMap.push(adminPolicy);
            
            // Verify both policies exist
            assert.strictEqual(policyMap.size, 2);
            assert.ok(policyMap.has('user'));
            assert.ok(policyMap.has('admin'));
            assert.strictEqual(policyMap.get('user'), userPolicy);
            assert.strictEqual(policyMap.get('admin'), adminPolicy);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.PolicyMap.prototype.push - overwriting existing policy', function(done) {
        try {
            // Create initial policy
            const originalUserPolicy = _spacl_core