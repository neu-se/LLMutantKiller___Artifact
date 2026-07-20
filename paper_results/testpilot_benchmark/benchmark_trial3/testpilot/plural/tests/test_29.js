let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    
    // Clean up before each test to ensure String.prototype.plural is not defined
    beforeEach(function() {
        if (String.prototype.plural !== undefined) {
            delete String.prototype.plural;
        }
    });
    
    // Clean up after all tests
    after(function() {
        if (String.prototype.plural !== undefined) {
            delete String.prototype.plural;
        }
    });

    it('test plural.monkeyPatch adds plural method to String prototype', function(done) {
        // Ensure plural method doesn't exist initially
        assert.strictEqual(String.prototype.plural, undefined);
        
        // Apply monkey patch
        plural.monkeyPatch();
        
        // Verify plural method was added
        assert.notStrictEqual(String.prototype.plural, undefined);
        assert.strictEqual(typeof String.prototype.plural, 'function');
        
        done();
    });

    })