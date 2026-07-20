let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - single policy', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        const policy = { name: 'testPolicy1', rules: ['rule1'] };
        
        const result = policyMap.push(policy);
        
        assert.strictEqual(result, policyMap, 'push should return the PolicyMap instance');
        assert.strictEqual(policyMap.get('testPolicy1'), policy, 'policy should be added to the map');
        done();
    });

    })