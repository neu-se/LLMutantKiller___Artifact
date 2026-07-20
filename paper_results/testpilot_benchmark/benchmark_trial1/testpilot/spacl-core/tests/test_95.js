```javascript
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
    it('test @spacl/core.Policy constructor', function(done) {
        const rule1 = new MockRule('/test', 'read', true);
        const rule2 = new MockRule('/test', 'write', false);
        
        const policy = new _spacl_core.Policy('test-policy', rule1, rule2);
        
        assert.strictEqual(policy.name, 'test-policy');
        assert.strictEqual(policy.rules.length, 2);
        assert.strictEqual(policy.rules[0], rule1);
        assert.strictEqual(policy.rules[1], rule2);
        
        done();
    });
    
    it('test @spacl/core.Policy push method', function(done) {
        const rule1 = new MockRule('/test', 'read', true);
        const rule2 = new MockRule('/test', 'write', false);
        const rule3 = new MockRule('/admin', 'read', true);
        
        const policy = new _spacl_core.Policy('test-policy', rule1);
        const result = policy.push(rule2, rule3);
        
        assert.strictEqual(policy.rules.length, 3);
        assert.strictEqual(policy.rules[1], rule2);
        assert.strictEqual(policy.rules[2], rule3);
        assert.strictEqual(result, policy); // Should return this for chaining
        
        done();
    });
    
    it('test @spacl/core.Policy query method - allow', function(done) {
        const allowRule = new MockRule('/test', 'read', true);
        const policy = new _spacl_core.Policy('test-policy', allowRule);
        
        const result = policy.query('/test', 'read', {});
        assert.strictEqual(result, true);
        
        done();
    });
    
    it('test @spacl/core.Policy query method - deny', function(done) {
        const denyRule = new MockRule('/test', 'write', false);
        const policy = new _spacl_core.Policy('test-policy', denyRule);
        
        const result = policy.query('/test', 'write', {});
        assert.strictEqual(result, false);
        
        done();
    });
    
    it('test @spacl/core.Policy query method - no match', function(done) {
        const rule = new MockRule('/test', 'read', true);
        const policy = new _spacl_core.Policy('test-policy', rule);
        
        const result = policy.query('/other', 'read', {});
        assert.strictEqual(result, null);
        
        done();
    });
    
    it('test @spacl/core.Policy query method - deny overrides allow', function(done) {
        const allowRule = new MockRule('/test', 'read', true);
        const denyRule = new MockRule('/test', 'read', false);
        const policy = new _spacl_core.Policy('test-policy', allowRule, denyRule);
        
        const result = policy.query('/test', 'read', {});