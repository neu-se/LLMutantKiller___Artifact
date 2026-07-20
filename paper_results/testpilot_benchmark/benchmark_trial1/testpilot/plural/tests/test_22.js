let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.unmonkeyPatch when no monkey patching was applied', function(done) {
        // First, ensure we start clean by calling unmonkeyPatch
        plural.unmonkeyPatch();
        
        // Verify no plural method exists after unmonkeyPatch
        assert(typeof String.prototype.plural === 'undefined', 'String.prototype.plural should be undefined after unmonkeyPatch');
        
        // Call unmonkeyPatch when nothing was patched - should not throw
        assert.doesNotThrow(() => {
            plural.unmonkeyPatch();
        }, 'unmonkeyPatch should not throw when called without prior monkey patching');
        
        done();
    });
});