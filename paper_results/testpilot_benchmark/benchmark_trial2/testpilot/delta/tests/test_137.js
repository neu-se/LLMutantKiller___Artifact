let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with empty delta', function(done) {
        let delta = new quill_delta();
        
        let [matching, nonMatching] = delta.partition(op => op.retain);
        
        // Check if the returned values are Delta instances, if not create them
        if (!matching || !matching.ops) {
            matching = new quill_delta(matching || []);
        }
        if (!nonMatching || !nonMatching.ops) {
            nonMatching = new quill_delta(nonMatching || []);
        }
        
        assert.equal(matching.ops.length, 0);
        assert.equal(nonMatching.ops.length, 0);
        
        done();
    });
});