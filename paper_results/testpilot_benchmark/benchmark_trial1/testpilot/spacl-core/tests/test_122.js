```javascript
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

    it('test @spacl/core.PolicyMap.prototype.push - empty call', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        const initialSize = policyMap.size;
        
        const result = policyMap.push();
        
        assert.strictEqual(result, policyMap, 'push should return the PolicyMap instance');
        assert.strictEqual(policyMap.size, initialSize, 'map size should remain unchanged');
        done();
    });

    it('test @spacl/core.PolicyMap.prototype.push - overwrite existing policy', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        const originalPolicy = { name: 'testPolicy', rules: ['originalRule'] };
        const updatedPolicy = { name: 'testPolicy', rules: ['updatedRule'] };
        
        policyMap.push(originalPolicy);
        const result = policyMap.push(updatedPolicy);
        
        assert.strictEqual(result, policyMap, 'push should return the PolicyMap instance');
        assert.strictEqual(policyMap.get('testPolicy'), updatedPolicy, 'policy should be overwritten');
        assert.notStrictEqual(policyMap.get('testPolicy'), originalPolicy, 'original policy should be replaced');
        done();
    });

    it('test @spacl/core.PolicyMap.prototype.push - chaining calls', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        const policy1 = { name: 'chain1', rules: ['rule1'] };
        const policy2 = { name: 'chain2', rules: ['rule2'] };
        const policy3 = { name: 'chain3', rules: ['rule3'] };
        
        const result = policyMap.push(policy1).push(policy2).push(policy3);
        
        assert.strictEqual(result, policyMap, 'chained calls should return the PolicyMap instance');
        assert.strictEqual(policyMap.get('chain1'), policy1, 'first chained policy should be added');
        assert.strictEqual(policyMap.get('chain2'), policy2, 'second chained policy should be added');
        assert.strictEqual(policyMap.get('chain3'), policy