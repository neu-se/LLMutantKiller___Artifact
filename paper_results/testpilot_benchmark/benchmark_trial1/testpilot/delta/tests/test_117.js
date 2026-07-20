let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with mixed operations and attributes', function(done) {
        let delta = new quill_delta([
            { insert: 'Bold text', attributes: { bold: true } },
            { retain: 5, attributes: { italic: true } },
            { delete: 3 }
        ]);
        
        let mapped = delta.map(function(op) {
            let newOp = Object.assign({}, op);
            if (newOp.attributes) {
                newOp.attributes = Object.assign({}, newOp.attributes, { mapped: true });
            }
            return newOp;
        });
        
        // Check if mapped is a Delta object or just an array
        let expectedOps = [
            { insert: 'Bold text', attributes: { bold: true, mapped: true } },
            { retain: 5, attributes: { italic: true, mapped: true } },
            { delete: 3 }
        ];
        
        if (mapped && mapped.ops) {
            assert.deepEqual(mapped.ops, expectedOps);
        } else {
            // If map returns an array directly
            assert.deepEqual(mapped, expectedOps);
        }
        done();
    });
});