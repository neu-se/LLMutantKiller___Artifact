let mocha = require('mocha');
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
        
        // Verify independence
        clonedRule.allow('update');
        assert.equal(originalRule.verbs.update, undefined);
        assert.equal(clonedRule.verbs.update, true);
        
        // Test clone with new spec
        const newSpec = '/api/posts/*';
        const clonedWithNewSpec = originalRule.clone(newSpec);
        assert.deepEqual(clonedWithNewSpec.verbs, originalRule.verbs);
        assert.equal(clonedWithNewSpec.regex, newSpec);
        
        done();
    });
});