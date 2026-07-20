let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for creates a new Rule instance', function(done) {
        // Test with a proper spec object that has a match method
        const spec = { 
            name: 'testRule', 
            condition: 'test',
            match: function() {
                return true; // Simple match function that always returns true
            }
        };
        const rule = _spacl_core.Rule.for(spec);
        
        // Verify that a Rule instance is returned
        assert(rule instanceof _spacl_core.Rule, 'Should return a Rule instance');
        done();
    });
});