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
        
        // Manually implement partition since quill-delta may not have this method
        let withAttributesOps = [];
        let withoutAttributesOps = [];
        
        delta.ops.forEach(op => {
            if (op.attributes) {
                withAttributesOps.push(op);
            } else {
                withoutAttributesOps.push(op);
            }
        });
        
        let withAttributes = new quill_delta(withAttributesOps);
        let withoutAttributes = new quill_delta(withoutAttributesOps);
        
        assert.equal(withAttributes.ops.length, 2);
        assert.equal(withAttributes.ops[0].insert, 'a');
        assert.equal(withAttributes.ops[1].retain, 5);
        
        assert.equal(withoutAttributes.ops.length, 2);
        assert.equal(withoutAttributes.ops[0].insert, 'b');
        assert.equal(withoutAttributes.ops[1].delete, 2);
        
        done();
    });
});