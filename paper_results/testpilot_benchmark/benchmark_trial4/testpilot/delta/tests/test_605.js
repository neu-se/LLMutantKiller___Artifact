let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - with formatting attributes', function(done) {
        const delta1 = new Delta([{ insert: 'Hello', attributes: { bold: true } }]);
        const delta2 = new Delta([{ insert: 'Hello', attributes: { italic: true } }]);
        
        const result = delta1.diff(delta2);
        
        assert.strictEqual(result.ops.length, 1, 'Should have one retain operation');
        assert.deepStrictEqual(result.ops[0], { 
            retain: 5, 
            attributes: { bold: null, italic: true } 
        }, 'Should retain with attribute changes');
        done();
    });
});