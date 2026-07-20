let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with single policy', function(done) {
        // Create a simple policy
        const userPolicy = _spacl_core.Policy.for('user',
            _spacl_core.Rule.for('/user/+').allow('get')
        );
        
        const policyMap = _spacl_core.PolicyMap.for(userPolicy);
        
        assert(policyMap instanceof _spacl_core.PolicyMap, 'Should return a PolicyMap instance');
        done();
    });

    })