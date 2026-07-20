let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query - parameter validation', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test that the method exists and is callable
            assert(typeof rule.query === 'function', 'query should be a function');
            
            // Test that calling with minimal parameters doesn't throw
            let result = rule.query('/test', 'GET');
            assert(result !== undefined, 'Query with minimal parameters should work');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});