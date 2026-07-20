let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone - deep clone with default name', function(done) {
        // Create a mock rule with clone method
        const mockRule1 = {
            clone: function() { return { id: 'rule1-clone', type: 'mock' }; },
            id: 'rule1',
            type: 'original'
        };
        const mockRule2 = {
            clone: function() { return { id: 'rule2-clone', type: 'mock' }; },
            id: 'rule2',
            type: 'original'
        };
        
        // Create policy with rules
        const originalPolicy = new _spacl_core.Policy('test-policy', mockRule1, mockRule2);
        
        // Test deep clone with default name
        const clonedPolicy = originalPolicy.clone();
        
        assert.strictEqual(clonedPolicy.name, 'test-policy');
        assert.strictEqual(clonedPolicy.rules.length, 2);
        assert.strictEqual(clonedPolicy.rules[0].id, 'rule1-clone');
        assert.strictEqual(clonedPolicy.rules[1].id, 'rule2-clone');
        assert.notStrictEqual(clonedPolicy, originalPolicy);
        
        done();
    });

    })