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
        
        let result = delta.partition(op => op.insert);
        
        // Check if result is an array with two elements
        assert(Array.isArray(result), 'partition should return an array');
        assert.equal(result.length, 2, 'partition should return array with 2 elements');
        
        let [matching, nonMatching] = result;
        
        // Ensure both results are Delta objects
        assert(matching instanceof quill_delta, 'matching should be a Delta instance');
        assert(nonMatching instanceof quill_delta, 'nonMatching should be a Delta instance');
        
        assert.equal(matching.ops.length, 0);
        assert.equal(nonMatching.ops.length, 3);
        
        done();
    });
});