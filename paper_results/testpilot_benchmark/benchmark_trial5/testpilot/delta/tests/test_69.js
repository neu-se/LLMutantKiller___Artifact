let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.Op.length', function(done) {
        // Test insert operation with string
        let insertOp = { insert: 'Hello' };
        assert.equal(quill_delta.Op.length(insertOp), 5);
        
        // Test insert operation with single character
        let insertOpSingle = { insert: 'A' };
        assert.equal(quill_delta.Op.length(insertOpSingle), 1);
        
        // Test retain operation
        let retainOp = { retain: 3 };
        assert.equal(quill_delta.Op.length(retainOp), 3);
        
        // Test delete operation
        let deleteOp = { delete: 2 };
        assert.equal(quill_delta.Op.length(deleteOp), 2);
        
        // Test insert operation with empty string
        let insertOpEmpty = { insert: '' };
        assert.equal(quill_delta.Op.length(insertOpEmpty), 0);
        
        // Test insert operation with longer text
        let insertOpLong = { insert: 'Hello World!' };
        assert.equal(quill_delta.Op.length(insertOpLong), 12);
        
        // Test retain operation with zero
        let retainOpZero = { retain: 0 };
        assert.equal(quill_delta.Op.length(retainOpZero), 0);
        
        done();
    });
});