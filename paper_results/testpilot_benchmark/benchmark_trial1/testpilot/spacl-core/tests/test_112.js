```javascript
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
        
        // Create original policy
        const originalPolicy = new _spacl_core.Policy('test-policy', mockRule1, mockRule2);
        
        // Test deep clone with default name
        const clonedPolicy = originalPolicy.clone();
        
        assert.strictEqual(clonedPolicy.name, 'test-policy');
        assert.strictEqual(clonedPolicy.rules.length, 2);
        assert.strictEqual(clonedPolicy.rules[0].id, 'rule1-clone');
        assert.strictEqual(clonedPolicy.rules[1].id, 'rule2-clone');
        assert.notStrictEqual(clonedPolicy, originalPolicy);
        assert.notStrictEqual(clonedPolicy.rules[0], originalPolicy.rules[0]);
        
        done();
    });

    it('test @spacl/core.Policy.prototype.clone - deep clone with custom name', function(done) {
        const mockRule = {
            clone: function() { return { id: 'cloned-rule', data: 'cloned' }; },
            id: 'original-rule',
            data: 'original'
        };
        
        const originalPolicy = new _spacl_core.Policy('original-policy', mockRule);
        const clonedPolicy = originalPolicy.clone('new-policy-name');
        
        assert.strictEqual(clonedPolicy.name, 'new-policy-name');
        assert.strictEqual(clonedPolicy.rules.length, 1);
        assert.strictEqual(clonedPolicy.rules[0].id, 'cloned-rule');
        assert.strictEqual(clonedPolicy.rules[0].data, 'cloned');
        
        done();
    });

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
        const clonedPolicy = originalPolicy.clone('shallow-clone', false);
        
        assert.strictEqual(clonedPolicy.name, 'shallow-clone');
        assert.strictEqual(clonedPolicy.rules.length, 2);
        // In shallow clone, rules should be the same objects
        assert.strictEqual(clonedPolicy.rules[0], originalPolicy.rules[0]);
        assert.strictEqual(clonedPolicy.rules[1], originalPolicy.rules[1]);
        assert.strictEqual(clonedPolicy.rules[0].id, 'rule1');
        assert.strictEqual(clonedPolicy.rules[1].id, 'rule2');
        
        done();
    });

    it('test @spacl/core.Policy.prototype.clone - empty policy', function(done) {
        const originalPolicy = new _spacl_core.Policy('