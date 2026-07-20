let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - filter with attributes', function(done) {
        let delta = new quill_delta([
            { insert: 'plain text' },
            { insert: 'bold text', attributes: { bold: true } },
            { insert: 'italic text', attributes: { italic: true } },
            { retain: 5, attributes: { underline: true } }
        ]);
        
        // Filter operations with attributes
        let filtered = delta.filter(op => op.attributes !== undefined);
        
        assert.equal(filtered.ops.length, 3);
        assert.deepEqual(filtered.ops[0].attributes, { bold: true });
        assert.deepEqual(filtered.ops[1].attributes, { italic: true });
        assert.deepEqual(filtered.ops[2].attributes, { underline: true });
        done();
    });
});