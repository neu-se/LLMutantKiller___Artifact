```javascript
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query - basic allow policy', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            // Add a simple allow policy
            policyMap.add('test-policy', {
                path: '/api/users',
                verb: 'GET',
                effect: 'allow'
            });
            
            const result = policyMap.query('test-policy', '/api/users', 'GET', {});
            assert.strictEqual(result.effect, 'allow');
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.PolicyMap.prototype.query - basic deny policy', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            // Add a simple deny policy
            policyMap.add('deny-policy', {
                path: '/admin',
                verb: 'DELETE',
                effect: 'deny'
            });
            
            const result = policyMap.query('deny-policy', '/admin', 'DELETE', {});
            assert.strictEqual(result.effect, 'deny');
            done();
        } catch (error) {
            done(error);
        }
    });

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

    it('test @spacl/core.PolicyMap.prototype.query - path mismatch', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            policyMap.add('path-policy', {
                path: '/api/users',
                verb: 'GET',
                effect: 'allow'
            });
            
            const result = policyMap.query('path-policy', '/api/posts', 'GET', {});
            assert.strictEqual(result.effect, 'deny');
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.PolicyMap.prototype.query - verb mismatch', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            policyMap.add('verb-policy', {
                path: '/api/users',
                verb: 'GET',
                effect: 'allow'
            });
            
            const result = policyMap.query('verb-policy', '/api/users', 'POST', {});
            assert.strictEqual(result.effect, 'deny');
            done();
        } catch (error) {
            done(error);
        }
    });

    it('test @spacl/core.PolicyMap.prototype.query - with context conditions', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            
            policyMap.add('context-policy', {
                path: '/api/users',
                verb: 'GET',
                effect: 'allow',
                conditions: {
                    role: 'admin'
                }
            });
            
            const contextWithRole = { role: 'admin' };
            const contextWithoutRole = { role: 'user' };
            
            const allowResult = policyMap.query('context-policy', '/api/users', 'GET', contextWithRole);
            const denyResult = policyMap.query('context-policy', '/api/