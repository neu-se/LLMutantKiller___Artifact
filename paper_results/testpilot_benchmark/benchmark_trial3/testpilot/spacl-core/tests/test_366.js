let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - multiple policies', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        const policy1 = { name: 'policy1', rules: ['rule1'] };
        const policy2 = { name: 'policy2', rules: ['rule2'] };
        const policy3 = { name: 'policy3', rules: ['rule3'] };
        
        const result = policyMap.push(policy1, policy2, policy3);
        
        assert.strictEqual(result, policyMap, 'push should return the PolicyMap instance');
        assert.strictEqual(policyMap.get('policy1'), policy1, 'first policy should be added');
        assert.strictEqual(policyMap.get('policy2'), policy2, 'second policy should be added');
        assert.strictEqual(policyMap.get('policy3'), policy3, 'third policy should be added');
        done();
    });

    })