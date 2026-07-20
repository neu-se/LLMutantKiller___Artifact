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
    it('test @spacl/core.Policy static for method', function(done) {
        const rule = new MockRule('/test', 'read', true);
        const policy = _spacl_core.Policy.for('testPolicy', rule);
        
        assert(policy instanceof _spacl_core.Policy);
        assert.strictEqual(policy.name, 'testPolicy');
        assert.strictEqual(policy.rules.length, 1);
        assert.strictEqual(policy.rules[0], rule);
        done();
    });
});