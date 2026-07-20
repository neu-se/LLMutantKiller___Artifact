let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - empty call', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        const initialSize = policyMap.size;
        
        const result = policyMap.push();
        
        assert.strictEqual(result, policyMap, 'push should return the PolicyMap instance');
        assert.strictEqual(policyMap.size, initialSize, 'map size should remain unchanged');
        done();
    });

    })