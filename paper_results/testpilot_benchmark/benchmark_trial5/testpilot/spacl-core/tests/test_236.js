let assert = require('assert');
let _spacl_core = require('@spacl/core');

// Mock Rule class for testing
class MockRule {
    constructor(path, verb, result) {
        this.path = path;
        this.verb = verb;
        this.result = result;
    }
    
    query(path, verb, ctx) {
        if (this.path === path && this.verb === verb) {
            return this.result;
        }
        return null;
    }
    
    matches(path, ctx) {
        return this.path === path;
    }
    
    clone() {
        return new MockRule(this.path, this.verb, this.result);
    }
}

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy push method', function(done) {
        const rule1 = new MockRule('/test', 'read', true);
        const policy = new _spacl_core.Policy('testPolicy');
        
        assert.strictEqual(policy.rules.length, 0);
        
        const result = policy.push(rule1);
        assert.strictEqual(policy.rules.length, 1);
        assert.strictEqual(policy.rules[0], rule1);
        assert.strictEqual(result, policy); // Should return this for chaining
        
        const rule2 = new MockRule('/test', 'write', false);
        policy.push(rule2);
        assert.strictEqual(policy.rules.length, 2);
        done();
    });
});