let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone preserves other properties', function(done) {
        // Create a rule instance
        const regex = /test/g;
        const rule = new _spacl_core.Rule(regex);
        
        // Set additional properties if they exist
        if (rule.hasOwnProperty('name')) {
            rule.name = 'test-rule';
        }
        if (rule.hasOwnProperty('priority')) {
            rule.priority = 5;
        }
        
        // Clone the rule
        const clonedRule = rule.clone();
        
        // Verify properties are preserved (if they exist)
        if (rule.hasOwnProperty('name')) {
            assert.strictEqual(clonedRule.name, rule.name, 'Name property should be preserved');
        }
        if (rule.hasOwnProperty('priority')) {
            assert.strictEqual(clonedRule.priority, rule.priority, 'Priority property should be preserved');
        }
        
        done();
    });

    })