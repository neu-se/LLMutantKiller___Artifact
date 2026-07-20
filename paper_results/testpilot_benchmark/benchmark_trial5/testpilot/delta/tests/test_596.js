let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - with attributes', function(done) {
        const delta1 = new Delta([{ insert: 'Hello', attributes: { bold: true } }]);
        const delta2 = new Delta([{ insert: 'Hello', attributes: { bold: true, italic: true } }]);
        
        const result = delta1.diff(delta2);
        
        assert.deepEqual(result.ops, [
            { retain: 5, attributes: { italic: true } }
        ]);
        done();
    });

    })