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
        
        assert.deepEqual(mapped.ops, [
            { insert: 'Bold text', attributes: { bold: true, mapped: true } },
            { retain: 5, attributes: { italic: true, mapped: true } },
            { delete: 3 }
        ]);
        done();
    });

    })