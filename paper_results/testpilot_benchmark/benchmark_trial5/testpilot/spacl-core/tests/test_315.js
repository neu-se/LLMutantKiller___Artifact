let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone - default parameters', function(done) {
        const mockRule = {
            clone: function() { return { id: 'cloned' }; },
            id: 'original'
        };
        
        const originalPolicy = new _spacl_core.Policy('default-test', mockRule);
        
        // Test with all default parameters
        const clonedPolicy = originalPolicy.clone();
        
        assert.strictEqual(clonedPolicy.name, 'default-test');
        assert.strictEqual(clonedPolicy.rules.length, 1);
        assert.strictEqual(clonedPolicy.rules[0].id, 'cloned');
        
        done();
    });
});