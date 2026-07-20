let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach with empty delta', function(done) {
        // Create an empty delta
        let delta = new quill_delta();
        
        let callCount = 0;
        
        // Test that forEach doesn't call predicate for empty delta
        delta.forEach(function(op, index) {
            callCount++;
        });
        
        assert.equal(callCount, 0);
        done();
    });
});