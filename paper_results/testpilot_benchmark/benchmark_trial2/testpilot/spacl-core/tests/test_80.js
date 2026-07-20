let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query - basic path matching', function(done) {
        try {
            // Create a simple rule instance with a pattern
            let rule = new _spacl_core.Rule('/api/users');
            
            // Test basic query with simple path
            let result = rule.query('/api/users', 'GET', {});
            
            // Assert that query returns a result (assuming it returns an object or boolean)
            assert(result !== undefined, 'Query should return a defined result');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});