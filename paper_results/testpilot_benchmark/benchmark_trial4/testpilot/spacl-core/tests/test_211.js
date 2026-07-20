let assert = require('assert');
let _spacl_core = require('@spacl/core');

// Mock Rule class for testing
class MockRule {
    constructor(path, verb, result, matchesResult = true) {
        this.path = path;
        this.verb = verb;
        this.result = result;
        this.matchesResult = matchesResult;
    }
    
    query(path, verb, ctx) {
        if (this.path === path && this.verb === verb) {
            return this.result;
        }
        return null;
    }
    
    matches(path, ctx) {
        return this.matchesResult && this.path === path;
    }
    
    clone() {
        return new MockRule(this.path, this.verb, this.result, this.matchesResult);
    }
}

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy static for method', function(done) {
        const rule1 = new MockRule('/test', 'read', true);
        const rule2 = new MockRule('/test', 'write', false);
        
        const policy = _spacl_core.Policy.for('staticPolicy', rule1, rule2);
        
        assert.strictEqual(policy.name, 'staticPolicy');
        assert.strictEqual(policy.rules.length, 2);
        assert.strictEqual(policy.rules[0], rule1);
        assert.strictEqual(policy.rules[1], rule2);
        done();
    });
});