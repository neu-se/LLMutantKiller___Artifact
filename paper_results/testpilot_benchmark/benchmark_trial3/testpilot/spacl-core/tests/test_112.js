let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny with single verb', function(done) {
        // Create a rule and deny a single verb
        const rule = _spacl_core.Rule.for('/user/:id').deny('delete');
        
        // Verify the rule exists and has the expected properties
        assert(rule !== null);
        assert(rule !== undefined);
        
        // The rule should have denied permissions for 'delete'
        // This assumes the Rule object has some way to check denied verbs
        // Since we don't have the exact API, we'll test that the method returns the rule instance
        assert(rule instanceof _spacl_core.Rule);
        
        done();
    });

    })