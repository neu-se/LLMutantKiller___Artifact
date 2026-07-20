let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for creates a rule with correct spec', function(done) {
        // Test creating a rule with a simple path spec
        const rule = _spacl_core.Rule.for('/user/+');
        
        // Verify the rule was created successfully
        assert(rule !== null, 'Rule should be created');
        assert(rule !== undefined, 'Rule should be defined');
        
        done();
    });

    })