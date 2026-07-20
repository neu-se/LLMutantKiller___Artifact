let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone - deep clone with custom name', function(done) {
        const mockRule = {
            clone: function() { return { id: 'cloned-rule', data: 'cloned' }; },
            id: 'original-rule',
            data: 'original'
        };
        
        const originalPolicy = new _spacl_core.Policy('original-policy', mockRule);
        
        // Test deep clone with custom name
        const clonedPolicy = originalPolicy.clone('new-policy-name');
        
        assert.strictEqual(clonedPolicy.name, 'new-policy-name');
        assert.strictEqual(clonedPolicy.rules.length, 1);
        assert.strictEqual(clonedPolicy.rules[0].id, 'cloned-rule');
        assert.strictEqual(clonedPolicy.rules[0].data, 'cloned');
        
        done();
    });
});