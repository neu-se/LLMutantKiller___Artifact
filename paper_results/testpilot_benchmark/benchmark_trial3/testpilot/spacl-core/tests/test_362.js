let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - empty call', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            const initialLength = policyMap.length;
            
            const result = policyMap.push();
            
            // Verify no policies were added
            assert.strictEqual(policyMap.length, initialLength);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })