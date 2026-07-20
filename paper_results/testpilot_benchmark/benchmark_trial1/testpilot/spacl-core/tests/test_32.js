let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow method chaining', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test that multiple allow calls can be chained
            let result = rule.allow('read').allow('write').allow('execute');
            
            assert.strictEqual(result, rule, 'allow() should support method chaining');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })