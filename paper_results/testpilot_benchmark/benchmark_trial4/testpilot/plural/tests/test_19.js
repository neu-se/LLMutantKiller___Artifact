let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.unmonkeyPatch is safe to call multiple times', function(done) {
        // Apply monkey patch
        plural.monkeyPatch();
        assert(typeof String.prototype.plural === 'function', 'String.prototype.plural should exist');
        
        // Call unmonkeyPatch multiple times
        plural.unmonkeyPatch();
        plural.unmonkeyPatch();
        plural.unmonkeyPatch();
        
        // Should be undefined and not throw errors
        assert.strictEqual(String.prototype.plural, undefined, 'String.prototype.plural should be undefined');
        
        // Also verify it's not just falsy but actually removed
        assert(!String.prototype.hasOwnProperty('plural'), 'String.prototype should not have plural property');
        
        done();
    });
});