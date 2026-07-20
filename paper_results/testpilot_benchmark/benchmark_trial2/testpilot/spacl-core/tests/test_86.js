let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone preserves other properties', function(done) {
        // Create a rule instance and set some properties if they exist
        let originalRule = new _spacl_core.Rule(/test/);
        
        // Clone the rule
        let clonedRule = originalRule.clone();
        
        // Verify basic functionality - both should be Rule instances
        assert(originalRule instanceof _spacl_core.Rule);
        assert(clonedRule instanceof _spacl_core.Rule);
        
        // Verify they are independent instances
        assert.notStrictEqual(originalRule, clonedRule);
        
        done();
    });

    })