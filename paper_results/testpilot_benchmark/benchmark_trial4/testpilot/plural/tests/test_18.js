let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.unmonkeyPatch when no monkey patching was applied', function(done) {
        // Ensure we start clean
        plural.unmonkeyPatch();
        
        // Store the current state of String.prototype.plural
        const initialPluralMethod = String.prototype.plural;
        
        // Call unmonkeyPatch when nothing was patched - should not throw
        assert.doesNotThrow(() => {
            plural.unmonkeyPatch();
        }, 'unmonkeyPatch should not throw when called without prior monkey patching');
        
        // Verify that calling unmonkeyPatch multiple times doesn't break anything
        assert.strictEqual(String.prototype.plural, initialPluralMethod, 'String.prototype.plural should remain unchanged after multiple unmonkeyPatch calls');
        
        done();
    });
});