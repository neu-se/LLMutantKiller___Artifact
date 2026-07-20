let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone - empty policy', function(done) {
        const emptyPolicy = new _spacl_core.Policy('empty-policy');
        
        // Test cloning empty policy
        const clonedPolicy = emptyPolicy.clone('cloned-empty');
        
        assert.strictEqual(clonedPolicy.name, 'cloned-empty');
        assert.strictEqual(clonedPolicy.rules.length, 0);
        assert.notStrictEqual(clonedPolicy, emptyPolicy);
        
        done();
    });
});