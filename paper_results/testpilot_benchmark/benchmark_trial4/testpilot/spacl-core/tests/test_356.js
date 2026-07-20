let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - chaining calls', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        const policy1 = { name: 'chain1', rules: ['rule1'] };
        const policy2 = { name: 'chain2', rules: ['rule2'] };
        const policy3 = { name: 'chain3', rules: ['rule3'] };
        
        const result = policyMap.push(policy1).push(policy2).push(policy3);
        
        assert.strictEqual(result, policyMap, 'chained calls should return the PolicyMap instance');
        assert.strictEqual(policyMap.get('chain1'), policy1, 'first chained policy should be added');
        assert.strictEqual(policyMap.get('chain2'), policy2, 'second chained policy should be added');
        assert.strictEqual(policyMap.get('chain3'), policy3, 'third chained policy should be added');
        done();
    });
});