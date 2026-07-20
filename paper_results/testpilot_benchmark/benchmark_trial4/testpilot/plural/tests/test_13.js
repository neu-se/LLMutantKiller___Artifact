let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.unmonkeyPatch removes monkey patching from String prototype', function(done) {
        // First, ensure monkey patching is applied
        plural.monkeyPatch();
        
        // Verify that the plural method exists on String prototype
        assert(typeof String.prototype.plural === 'function', 'String.prototype.plural should exist after monkey patching');
        
        // Test that the monkey patched method works
        assert.strictEqual('cat'.plural(), 'cats', 'Monkey patched plural should work');
        
        // Now unmonkey patch
        plural.unmonkeyPatch();
        
        // Verify that the plural method is removed from String prototype
        assert.strictEqual(String.prototype.plural, undefined, 'String.prototype.plural should be undefined after unmonkey patching');
        
        done();
    });

    })