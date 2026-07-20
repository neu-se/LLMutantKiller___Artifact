let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert - mixed operations with attributes', function(done) {
        const base = new Delta()
            .insert('Hello', { bold: true })
            .insert(' World');
        
        const delta = new Delta()
            .retain(5, { italic: true })
            .delete(6);
        
        const inverted = delta.invert(base);
        
        // Should invert attribute change and restore deleted content
        assert.equal(inverted.ops.length, 2);
        assert.equal(inverted.ops[0].retain, 5);
        assert.deepEqual(inverted.ops[0].attributes, { italic: null });
        assert.equal(inverted.ops[1].insert, ' World');
        done();
    });
});