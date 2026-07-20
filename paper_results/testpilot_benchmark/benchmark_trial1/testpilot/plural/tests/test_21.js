let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.unmonkeyPatch removes String.prototype.plural', function(done) {
        // First, ensure that String.prototype.plural exists (monkey patch it if needed)
        String.prototype.plural = function() { return 'test'; };
        
        // Verify it exists before calling unmonkeyPatch
        assert.strictEqual(typeof String.prototype.plural, 'function');
        
        // Call unmonkeyPatch
        plural.unmonkeyPatch();
        
        // Verify that String.prototype.plural is now null
        assert.strictEqual(String.prototype.plural, null);
        
        done();
    });
    
    })