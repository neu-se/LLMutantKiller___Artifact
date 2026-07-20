let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test allow and deny methods', function(done) {
        const rule = new _spacl_core.Rule('/api/users/*');
        
        // Test allow method
        rule.allow('read', 'write');
        assert.equal(rule.verbs.read, true);
        assert.equal(rule.verbs.write, true);
        
        // Test deny method
        rule.deny('delete');
        assert.equal(rule.verbs.delete, false);
        
        // Test that deny overrides allow
        rule.deny('read');
        assert.equal(rule.verbs.read, false);
        
        // Test that allow doesn't override deny
        rule.allow('read');
        assert.equal(rule.verbs.read, false);
        
        // Test method chaining
        const chainedRule = new _spacl_core.Rule('/test/*')
            .allow('get', 'post')
            .deny('delete');
        assert.equal(chainedRule.verbs.get, true);
        assert.equal(chainedRule.verbs.post, true);
        assert.equal(chainedRule.verbs.delete, false);
        
        done();
    });
});