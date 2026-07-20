let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.Op.length', function(done) {
        // Test delete operation
        let deleteOp = { delete: 5 };
        assert.equal(quill_delta.Op.length(deleteOp), 5);
        
        // Test retain operation with number
        let retainOp = { retain: 3 };
        assert.equal(quill_delta.Op.length(retainOp), 3);
        
        // Test retain operation with object
        let retainObjectOp = { retain: { bold: true } };
        assert.equal(quill_delta.Op.length(retainObjectOp), 1);
        
        // Test insert operation with string
        let insertStringOp = { insert: 'Hello' };
        assert.equal(quill_delta.Op.length(insertStringOp), 5);
        
        // Test insert operation with empty string
        let insertEmptyStringOp = { insert: '' };
        assert.equal(quill_delta.Op.length(insertEmptyStringOp), 0);
        
        // Test insert operation with non-string (embed)
        let insertEmbedOp = { insert: { image: 'url' } };
        assert.equal(quill_delta.Op.length(insertEmbedOp), 1);
        
        // Test delete with zero
        let deleteZeroOp = { delete: 0 };
        assert.equal(quill_delta.Op.length(deleteZeroOp), 0);
        
        // Test retain with zero
        let retainZeroOp = { retain: 0 };
        assert.equal(quill_delta.Op.length(retainZeroOp), 0);
        
        done();
    });
});