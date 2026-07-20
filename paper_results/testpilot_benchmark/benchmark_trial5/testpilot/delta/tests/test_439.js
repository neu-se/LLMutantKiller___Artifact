let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with no matching operations', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { delete: 3 },
            { retain: 2 }
        ]);
        
        let [matching, nonMatching] = delta.partition(op => op.insert);
        
        assert.equal(matching.ops.length, 0);
        assert.equal(nonMatching.ops.length, 3);
        
        done();
    });
});