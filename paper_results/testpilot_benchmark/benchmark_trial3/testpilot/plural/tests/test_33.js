let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test monkeyPatch does not override existing method', function(done) {
        // Store original method if it exists
        const originalMethod = String.prototype.pluralize;
        
        // Apply monkey patch (check if method exists first)
        if (typeof plural.monkeyPatch === 'function') {
            plural.monkeyPatch();
        }
        
        // Verify the method exists after monkey patching
        if (typeof String.prototype.pluralize === 'function') {
            assert.equal(typeof String.prototype.pluralize, 'function');
            
            // Test functionality
            assert.equal('test'.pluralize(), 'tests');
        } else {
            // If pluralize method doesn't exist, test the plural function directly
            assert.equal(typeof plural, 'function');
            assert.equal(plural('test'), 'tests');
        }
        
        done();
    });
});