let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach with single operation', function(done) {
        // Create a delta with single operation
        let delta = new quill_delta([{ insert: 'Test' }]);
        
        let capturedOp = null;
        let capturedIndex = null;
        
        // Test forEach with single operation
        delta.forEach(function(op, index) {
            capturedOp = op;
            capturedIndex = index;
        });
        
        // Verify the operation and index were captured correctly
        assert.deepEqual(capturedOp, { insert: 'Test' });
        assert.equal(capturedIndex, 0);
        
        done();
    });
    
    })