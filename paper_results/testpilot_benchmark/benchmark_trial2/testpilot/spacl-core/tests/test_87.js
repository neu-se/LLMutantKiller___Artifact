let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with string spec', function(done) {
        // Create a rule instance
        let originalRule = new _spacl_core.Rule(/original/);
        
        // Clone with a string pattern (should be converted to regex)
        let clonedRule = originalRule.clone('string\\d+');
        
        // Verify the clone is a different instance
        assert.notStrictEqual(originalRule, clonedRule);
        
        // Verify the clone has a regex property
        assert(clonedRule.regex instanceof RegExp);
        
        done();
    });
});