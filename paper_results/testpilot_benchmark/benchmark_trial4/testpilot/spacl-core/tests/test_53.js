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
        assert.notEqual(clonedRule, originalRule); // Different instances
        
        // Test clone with new spec
        const clonedWithNewSpec = originalRule.clone('/api/posts/*');
        assert.deepEqual(clonedWithNewSpec.verbs, originalRule.verbs);
        assert.notEqual(clonedWithNewSpec.regex, originalRule.regex);
        
        // Verify that modifying clone doesn't affect original
        clonedRule.allow('admin');
        assert.equal(clonedRule.verbs.admin, true);
        assert.equal(originalRule.verbs.admin, undefined);
        
        done();
    });

    })