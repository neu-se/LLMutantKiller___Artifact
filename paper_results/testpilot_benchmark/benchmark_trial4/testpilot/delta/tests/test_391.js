let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - empty delta', function(done) {
        let delta = new quill_delta();
        
        // Filter empty delta
        let filtered = delta.filter(op => true);
        
        assert.equal(filtered.ops.length, 0);
        done();
    });
});