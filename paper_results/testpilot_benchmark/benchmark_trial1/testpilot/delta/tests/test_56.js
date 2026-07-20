let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - empty objects', function(done) {
        // Create two deltas with empty attributes and compare them
        let delta1 = new Delta().insert('text', {});
        let delta2 = new Delta().insert('text', {});
        let result = delta1.diff(delta2);
        
        // The diff of identical deltas should be empty
        assert.deepEqual(result.ops, []);
        done();
    });
});