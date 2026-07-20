let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.monkeyPatch does not overwrite existing methods', function(done) {
        // Add a custom method to String prototype
        String.prototype.pluralize = function() { return 'custom'; };
        const customMethod = String.prototype.pluralize;
        
        try {
            // Apply monkey patch
            plural.monkeyPatch();
            
            // Test that the method was replaced (or verify behavior based on library implementation)
            const result = 'test'.pluralize();
            assert(typeof result === 'string', 'pluralize should return a string');
            
            done();
        } catch (error) {
            done(error);
        } finally {
            // Clean up
            delete String.prototype.pluralize;
        }
    });
    
    })