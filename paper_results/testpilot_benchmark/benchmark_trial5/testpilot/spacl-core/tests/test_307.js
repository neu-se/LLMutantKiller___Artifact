let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone - shallow copy', function(done) {
        try {
            // Create a policy instance
            let originalPolicy = new _spacl_core.Policy('testPolicy');
            
            // Clone with shallow copy
            let clonedPolicy = originalPolicy.clone('shallowClone', false);
            
            // Verify the clone has the correct name
            assert.strictEqual(clonedPolicy.name, 'shallowClone');
            
            // Verify it's a different instance
            assert.notStrictEqual(clonedPolicy, originalPolicy);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })