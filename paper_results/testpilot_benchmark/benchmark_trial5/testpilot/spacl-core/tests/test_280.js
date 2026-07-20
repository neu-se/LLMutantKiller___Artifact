let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query - wildcard path matching', function(done) {
        try {
            let _spacl_core = require('@spacl/core');
            
            // Create a policy with wildcard path
            const policy = new _spacl_core.Policy();
            policy.addRule({
                effect: 'allow',
                path: '/api/*',
                verb: 'GET',
                conditions: []
            });
            
            const result1 = policy.query('/api/users', 'GET', {});
            const result2 = policy.query('/api/posts', 'GET', {});
            const result3 = policy.query('/public/info', 'GET', {});
            
            if (result1.effect !== 'allow') {
                throw new Error('Should allow GET to /api/users');
            }
            if (result2.effect !== 'allow') {
                throw new Error('Should allow GET to /api/posts');
            }
            if (result3.effect !== 'deny') {
                throw new Error('Should deny GET to /public/info');
            }
            
            done();
        } catch (error) {
            done(error);
        }
    });
});