let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with complex spec object', function(done) {
        // Test with a more complex spec object
        const spec = {
            name: 'complexRule',
            conditions: ['condition1', 'condition2'],
            actions: ['action1', 'action2'],
            metadata: { version: '1.0', author: 'test' }
        };
        const rule = _spacl_core.Rule.for(spec);
        
        // Verify that a Rule instance is returned
        assert(rule instanceof _spacl_core.Rule, 'Should return a Rule instance with complex spec');
        done();
    });

    })