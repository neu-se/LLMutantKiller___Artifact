let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone - shallow clone', function(done) {
        const mockRule1 = {
            clone: function() { return { id: 'should-not-be-called' }; },
            id: 'rule1',
            type: 'original'
        };
        const mockRule2 = {
            clone: function() { return { id: 'should-not-be-called' }; },
            id: 'rule2',
            type: 'original'
        };
        
        const originalPolicy = new _spacl_core.Policy('test-policy', mockRule1, mockRule2);
        
        // Test shallow clone
        const clonedPolicy = originalPolicy.clone('shallow-policy', false);
        
        assert.strictEqual(clonedPolicy.name, 'shallow-policy');
        assert.strictEqual(clonedPolicy.rules.length, 2);
        // In shallow clone, rules should be the same objects (not cloned)
        assert.strictEqual(clonedPolicy.rules[0], mockRule1);
        assert.strictEqual(clonedPolicy.rules[1], mockRule2);
        assert.strictEqual(clonedPolicy.rules[0].id, 'rule1');
        assert.strictEqual(clonedPolicy.rules[1].id, 'rule2');
        
        done();
    });
});