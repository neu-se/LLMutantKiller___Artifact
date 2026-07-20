let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.unmonkeyPatch preserves other String prototype methods', function(done) {
        // Store reference to existing String methods
        const originalToUpperCase = String.prototype.toUpperCase;
        const originalSubstring = String.prototype.substring;
        
        // Apply and remove monkey patch
        plural.monkeyPatch();
        plural.unmonkeyPatch();
        
        // Verify original methods are still intact
        assert.strictEqual(String.prototype.toUpperCase, originalToUpperCase, 'toUpperCase should be preserved');
        assert.strictEqual(String.prototype.substring, originalSubstring, 'substring should be preserved');
        
        // Verify they still work
        assert.strictEqual('hello'.toUpperCase(), 'HELLO', 'toUpperCase should still work');
        assert.strictEqual('hello'.substring(1, 3), 'el', 'substring should still work');
        
        done();
    });
});