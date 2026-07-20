let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - with attributes', function(done) {
        const delta1 = new Delta([{ insert: 'Hello', attributes: { bold: true } }]);
        const delta2 = new Delta([{ insert: 'Hello', attributes: { bold: true, italic: true } }]);
        
        const result = delta1.diff(delta2);
        assert.strictEqual(result.ops.length, 1, 'Should have one retain operation');
        assert.deepStrictEqual(result.ops[0], { 
            retain: 5, 
            attributes: { italic: true } 
        }, 'Should retain text and add italic attribute');
        done();
    });

    })