let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - returns false when no rules exist', function(done) {
        // Create policy with empty rules array
        const policy = new _spacl_core.Policy();
        policy.rules = [];
        
        // Test
        const result = policy.matches('/test/path', { user: 'testuser' });
        assert.strictEqual(result, false);
        done();
    });
    
    })