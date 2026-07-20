let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with mixed operations and attributes', function(done) {
        let delta = new quill_delta([
            { insert: 'Bold text', attributes: { bold: true } },
            { retain: 5, attributes: { italic: true } },
            { delete: 3 }
        ]);
        
        let mapped = delta.map(function(op, index) {
            let newOp = Object.assign({}, op);
            newOp.index = index;
            return newOp;
        });
        
        assert.deepEqual(mapped.ops, [
            { insert: 'Bold text', attributes: { bold: true }, index: 0 },
            { retain: 5, attributes: { italic: true }, index: 1 },
            { delete: 3, index: 2 }
        ]);
        done();
    });
});