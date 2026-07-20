let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with empty delta', function(done) {
        let delta = new quill_delta();
        
        let [matching, nonMatching] = delta.partition(op => op.retain);
        
        assert.equal(matching.ops.length, 0);
        assert.equal(nonMatching.ops.length, 0);
        
        done();
    });
});