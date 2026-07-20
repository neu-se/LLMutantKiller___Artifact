let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with attributes collection', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello', attributes: { bold: true } },
            { insert: ' World', attributes: { italic: true, bold: true } },
            { insert: '!', attributes: { underline: true } }
        ]);
        
        // Test collecting all unique attributes
        let attributes = delta.reduce((acc, op) => {
            if (op.attributes) {
                Object.keys(op.attributes).forEach(attr => {
                    acc.add(attr);
                });
            }
            return acc;
        }, new Set());
        
        assert.strictEqual(attributes.size, 3);
        assert.ok(attributes.has('bold'));
        assert.ok(attributes.has('italic'));
        assert.ok(attributes.has('underline'));
        done();
    });
});