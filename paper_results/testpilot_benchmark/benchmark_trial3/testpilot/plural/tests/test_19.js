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
        
        // Should still be undefined and not throw errors
        assert(typeof String.prototype.plural === 'undefined', 'String.prototype.plural should remain undefined');
        
        done();
    });

    })