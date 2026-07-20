let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with multiple policies', function(done) {
        // Create multiple policies
        const userPolicy = _spacl_core.Policy.for('user',
            _spacl_core.Rule.for('/user/+').allow('get'),
            _spacl_core.Rule.for('/user/:name').allow('put')
        );
        
        const adminPolicy = userPolicy.clone('admin').push(
            _spacl_core.Rule.for('/user/+').allow('put', 'post', 'delete'),
            _spacl_core.Rule.for('/user/:name').deny('delete')
        );
        
        const guestPolicy = _spacl_core.Policy.for('guest',
            _spacl_core.Rule.for('/user/+').allow('get')
        );
        
        const policyMap = _spacl_core.PolicyMap.for(userPolicy, adminPolicy, guestPolicy);
        
        assert(policyMap instanceof _spacl_core.PolicyMap, 'Should return a PolicyMap instance');
        done();
    });

    })