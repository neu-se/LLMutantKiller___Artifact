let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach predicate receives correct parameters', function(done) {
        // Create a delta with operations
        let delta = new quill_delta([
            { retain: 3 },
            { insert: 'new text', attributes: { italic: true } }
        ]);
        
        let parameterTests = [];
        
        // Test that predicate receives operation, index, and array
        delta.forEach(function(op, index, array) {
            parameterTests.push({
                op: op,
                index: index,
                arrayLength: array ? array.length : null
            });
        });
        
        // Verify parameters for first operation
        assert.deepEqual(parameterTests[0].op, { retain: 3 });
        assert.equal(parameterTests[0].index, 0);
        assert.equal(parameterTests[0].arrayLength, 2);
        
        // Verify parameters for second operation
        assert.deepEqual(parameterTests[1].op, { insert: 'new text', attributes: { italic: true } });
        assert.equal(parameterTests[1].index, 1);
        assert.equal(parameterTests[1].arrayLength, 2);
        
        done();
    });
});