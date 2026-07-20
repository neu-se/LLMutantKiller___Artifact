let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test query with different contexts', function(done) {
        try {
            const rule = new _spacl_core.Rule();
            rule.allow('/user/:name', 'get', (ctx, params) => ctx.name === params.name);
            
            const ctx1 = { name: 'alice' };
            const ctx2 = { name: 'bob' };
            
            assert.strictEqual(rule.query('/user/alice', 'get', ctx1), true, 'alice should access her own data');
            assert.strictEqual(rule.query('/user/alice', 'get', ctx2), null, 'bob should not access alice data');
            assert.strictEqual(rule.query('/user/bob', 'get', ctx2), true, 'bob should access his own data');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })