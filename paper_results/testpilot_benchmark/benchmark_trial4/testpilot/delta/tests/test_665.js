let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert - retain with attributes', function(done) {
        const base = new Delta().insert('Hello', { bold: true });
        const delta = new Delta().retain(5, { italic: true });
        const inverted = delta.invert(base);
        
        // Should invert the attribute change
        assert.equal(inverted.ops.length, 1);
        assert.equal(inverted.ops[0].retain, 5);
        assert.deepEqual(inverted.ops[0].attributes, { italic: null });
        done();
    });
});