let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query - verb mismatch', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            policyMap.add('verb-policy', {
                path: '/api/users',
                verb: 'POST',
                effect: 'allow'
            });
            
            const result = policyMap.query('verb-policy', '/api/users', 'GET', {});
            assert.strictEqual(result.effect, 'deny');
            done();
        } catch (error) {
            done(error);
        }
    });

    })