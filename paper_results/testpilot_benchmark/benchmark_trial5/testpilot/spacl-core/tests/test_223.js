let mocha = require('mocha');
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
    it('test @spacl/core.Policy clone method - shallow', function(done) {
        const rule = new MockRule('/test', 'read', true);
        const policy = new _spacl_core.Policy('original', rule);
        
        const cloned = policy.clone('cloned', false);
        assert.strictEqual(cloned.name, 'cloned');
        assert.strictEqual(cloned.rules.length, 1);
        assert.strictEqual(cloned.rules[0], rule); // Same reference for shallow copy
        done();
    });
    
    })