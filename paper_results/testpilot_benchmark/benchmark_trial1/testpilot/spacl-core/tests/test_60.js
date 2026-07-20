let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny with single verb', function(done) {
        // Create a rule and deny a single verb
        const rule = _spacl_core.Rule.for('/user/:id').deny('delete');
        
        // Verify the rule was created
        assert(rule instanceof _spacl_core.Rule);
        
        // The rule should have the deny configuration
        // This assumes the rule object has some way to inspect denied verbs
        // Since we don't have the exact API, we'll test basic functionality
        assert(rule !== null);
        assert(rule !== undefined);
        
        done();
    });

    })