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
    it('test @spacl/core.Policy query method - no match', function(done) {
        const rule = new MockRule('/test', 'read', true);
        const policy = new _spacl_core.Policy('test-policy', rule);
        
        const result = policy.query('/other', 'read', {});
        assert.strictEqual(result, null);
        
        done();
    });
});