let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
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

    })