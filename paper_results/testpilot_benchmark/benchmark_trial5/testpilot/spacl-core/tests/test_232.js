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
    it('test @spacl/core.Policy query method - deny overrides allow', function(done) {
        const allowRule = new MockRule('/test', 'read', true);
        const denyRule = new MockRule('/test', 'read', false);
        const policy = new _spacl_core.Policy('testPolicy', allowRule, denyRule);
        
        const result = policy.query('/test', 'read', {});
        assert.strictEqual(result, false); // Deny should override allow
        done();
    });
    
})