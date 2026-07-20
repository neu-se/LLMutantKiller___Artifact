let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test clone method', function(done) {
        const originalRule = new _spacl_core.Rule('/api/users/*');
        originalRule.allow('read', 'write').deny('delete');
        
        // Test clone without new spec
        const clonedRule = originalRule.clone();
        assert.deepEqual(clonedRule.verbs, originalRule.verbs);
        assert.equal(clonedRule.regex, originalRule.regex);
        
        // Verify it's a separate object
        clonedRule.allow('update');
        assert.equal(originalRule.verbs.update, undefined);
        assert.equal(clonedRule.verbs.update, true);
        
        // Test clone with new spec
        const newSpecRule = originalRule.clone('/api/posts/*');
        assert.deepEqual(newSpecRule.verbs, originalRule.verbs);
        assert.notEqual(newSpecRule.regex, originalRule.regex);
        
        done();
    });
});