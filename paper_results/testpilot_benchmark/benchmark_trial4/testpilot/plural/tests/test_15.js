let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.unmonkeyPatch when no monkey patching was applied', function(done) {
        // Ensure we start clean
        plural.unmonkeyPatch();
        
        // Verify no plural method exists
        assert.strictEqual(String.prototype.plural, undefined, 'String.prototype.plural should be undefined initially');
        
        // Call unmonkeyPatch when nothing was patched - should not throw
        assert.doesNotThrow(() => {
            plural.unmonkeyPatch();
        }, 'unmonkeyPatch should not throw when called without prior monkey patching');
        
        done();
    });

    })