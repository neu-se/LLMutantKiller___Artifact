let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    // Store original state to restore after tests
    let originalPlural;
    
    beforeEach(function() {
        // Save the original state of String.prototype.plural
        originalPlural = String.prototype.plural;
        // Remove it if it exists to start with clean state
        delete String.prototype.plural;
    });
    
    afterEach(function() {
        // Restore original state
        if (originalPlural !== undefined) {
            String.prototype.plural = originalPlural;
        } else {
            delete String.prototype.plural;
        }
    });

    it('should add plural method to String prototype when not already present', function() {
        // Ensure String.prototype.plural is undefined initially
        assert.strictEqual(String.prototype.plural, undefined);
        
        // Call monkeyPatch
        plural.monkeyPatch();
        
        // Verify that plural method was added
        assert.strictEqual(typeof String.prototype.plural, 'function');
        
        // Test that the added method works (assuming plural function exists)
        let testString = 'cat';
        let result = testString.plural(2);
        assert.strictEqual(typeof result, 'string');
    });

    })