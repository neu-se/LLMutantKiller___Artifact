let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test query with non-matching paths', function(done) {
        try {
            const rule = new _spacl_core.Rule();
            rule.allow('/user/:name', 'get', (ctx) => true);
            
            const ctx = { name: 'test' };
            
            assert.strictEqual(rule.query('/admin/test', 'get', ctx), null, 'non-matching path should return null');
            assert.strictEqual(rule.query('/user/test', 'post', ctx), null, 'non-matching verb should return null');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});