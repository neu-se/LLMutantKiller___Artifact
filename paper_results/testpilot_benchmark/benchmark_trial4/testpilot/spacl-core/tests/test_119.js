let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test query with no rules', function(done) {
        try {
            const emptyRule = new _spacl_core.Rule();
            const ctx = { name: 'test' };
            
            assert.strictEqual(emptyRule.query('/any/path', 'get', ctx), null, 'empty rule should return null for any query');
            assert.strictEqual(emptyRule.query('/any/path', 'post', ctx), null, 'empty rule should return null for any verb');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});