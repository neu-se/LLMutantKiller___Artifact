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
    it('test @spacl/core.Policy matches method', function(done) {
        const rule1 = new MockRule('/test', 'read', true);
        const rule2 = new MockRule('/other', 'write', false);
        const policy = new _spacl_core.Policy('testPolicy', rule1, rule2);
        
        assert.strictEqual(policy.matches('/test', {}), true);
        assert.strictEqual(policy.matches('/other', {}), true);
        assert.strictEqual(policy.matches('/unknown', {}), false);
        done();
    });
    
    })