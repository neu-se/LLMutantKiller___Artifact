let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query - non-existent policy', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            const result = policyMap.query('non-existent', '/api/test', 'GET', {});
            assert.strictEqual(result, null);
            done();
        } catch (error) {
            done(error);
        }
    });

    })