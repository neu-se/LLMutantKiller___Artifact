let mocha = require('mocha');
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
        return this.path === path ? this.matchesResult : false;
    }
    
    clone() {
        return new MockRule(this.path, this.verb, this.result, this.matchesResult);
    }
}

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy clone method - deep copy', function(done) {
        const rule = new MockRule('/test', 'read', true);
        const policy = new _spacl_core.Policy('original-policy', rule);
        
        const cloned = policy.clone('cloned-policy', true);
        
        assert.strictEqual(cloned.name, 'cloned-policy');
        assert.strictEqual(cloned.rules.length, 1);
        assert.notStrictEqual(cloned.rules[0], rule); // Should be different object
        assert.strictEqual(cloned.rules[0].path, rule.path); // But same content
        
        done();
    });
    
    })