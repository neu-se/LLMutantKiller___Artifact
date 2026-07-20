let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - empty call', function(done) {
        try {
            const policy = new _spacl_core.Policy();
            const initialLength = policy.length;
            
            const result = policy.push();
            
            // Verify no rules were added
            assert.strictEqual(policy.length, initialLength);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })