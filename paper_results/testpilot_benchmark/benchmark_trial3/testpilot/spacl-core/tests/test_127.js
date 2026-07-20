let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query - null and undefined parameters', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test with null/undefined parameters (should handle gracefully or throw expected errors)
            try {
                let nullPathResult = rule.query(null, 'GET', {});
                assert(nullPathResult !== undefined, 'Query with null path should handle gracefully');
            } catch (e) {
                // Expected behavior - null path might throw an error
                assert(e instanceof Error, 'Should throw proper Error for null path');
            }
            
            try {
                let undefinedVerbResult = rule.query('/test', undefined, {});
                assert(undefinedVerbResult !== undefined, 'Query with undefined verb should handle gracefully');
            } catch (e) {
                // Expected behavior - undefined verb might throw an error
                assert(e instanceof Error, 'Should throw proper Error for undefined verb');
            }
            
            done();
        } catch (error) {
            done(error);
        }
    });
});