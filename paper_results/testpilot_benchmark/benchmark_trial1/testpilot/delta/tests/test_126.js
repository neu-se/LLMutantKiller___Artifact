let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with complex predicate', function(done) {
        let delta = new quill_delta([
            { insert: 'a', attributes: { bold: true } },
            { insert: 'b' },
            { retain: 5, attributes: { italic: true } },
            { delete: 2 }
        ]);
        
        let [withAttributes, withoutAttributes] = delta.partition(op => op.attributes);
        
        assert.equal(withAttributes.ops.length, 2);
        assert.equal(withAttributes.ops[0].insert, 'a');
        assert.equal(withAttributes.ops[1].retain, 5);
        
        assert.equal(withoutAttributes.ops.length, 2);
        assert.equal(withoutAttributes.ops[0].insert, 'b');
        assert.equal(withoutAttributes.ops[1].delete, 2);
        
        done();
    });
});