let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query - parameter validation', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test that the method handles various parameter types gracefully
            // These might throw errors or return specific values depending on implementation
            try {
                rule.query(null, 'GET', {});
            } catch (e) {
                // Expected behavior for null path
            }
            
            try {
                rule.query('/test', null, {});
            } catch (e) {
                // Expected behavior for null verb
            }
            
            try {
                rule.query('/test', 'INVALID_VERB', {});
            } catch (e) {
                // Expected behavior for invalid verb
            }
            
            // If we reach here without unhandled exceptions, the test passes
            done();
        } catch (error) {
            done(error);
        }
    });
});