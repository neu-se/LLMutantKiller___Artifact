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
        return this.matchesResult && this.path === path;
    }
    
    clone() {
        return new MockRule(this.path, this.verb, this.result, this.matchesResult);
    }
}

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy clone method - deep copy', function(done) {
        const rule = new MockRule('/test', 'read', true);
        const originalPolicy = new _spacl_core.Policy('original', rule);
        
        const clonedPolicy = originalPolicy.clone('cloned', true);
        
        assert.strictEqual(clonedPolicy.name, 'cloned');
        assert.strictEqual(clonedPolicy.rules.length, 1);
        assert.notStrictEqual(clonedPolicy.rules[0], rule); // Should be different object
        assert.strictEqual(clonedPolicy.rules[0].path, rule.path); // But same content
        done();
    });

    })