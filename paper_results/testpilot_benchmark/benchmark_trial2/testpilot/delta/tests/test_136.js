let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with all matching operations', function(done) {
        let delta = new quill_delta([
            { insert: 'hello' },
            { insert: 'world' },
            { insert: '!' }
        ]);
        
        let result = delta.partition(op => op.insert);
        
        // Check if partition returns an array with two elements
        assert(Array.isArray(result), 'partition should return an array');
        assert.equal(result.length, 2, 'partition should return array with 2 elements');
        
        let [matching, nonMatching] = result;
        
        // Ensure both elements exist and have ops property
        assert(matching && matching.ops, 'matching should exist and have ops property');
        assert(nonMatching && nonMatching.ops, 'nonMatching should exist and have ops property');
        
        assert.equal(matching.ops.length, 3);
        assert.equal(nonMatching.ops.length, 0);
        
        done();
    });
});