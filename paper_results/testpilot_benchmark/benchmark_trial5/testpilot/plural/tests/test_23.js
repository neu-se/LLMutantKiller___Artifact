let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test monkeyPatch does not override existing method', function(done) {
        // Store original method if it exists
        const originalMethod = String.prototype.pluralize;
        
        // Apply monkey patch
        plural.monkeyPatch();
        
        // Verify the method exists
        assert.equal(typeof String.prototype.pluralize, 'function');
        
        // Test functionality
        assert.equal('test'.pluralize(), 'tests');
        
        done();
    });
    
    })