let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain - multiple retain operations', function(done) {
        let delta = new quill_delta();
        delta.retain(2, { bold: true })
             .retain(3, { italic: true })
             .retain(1);
        
        assert.strictEqual(delta.ops.length, 3, 'should have three operations');
        assert.strictEqual(delta.ops[0].retain, 2, 'first operation should retain 2');
        assert.deepStrictEqual(delta.ops[0].attributes, { bold: true }, 'first operation should have bold attribute');
        assert.strictEqual(delta.ops[1].retain, 3, 'second operation should retain 3');
        assert.deepStrictEqual(delta.ops[1].attributes, { italic: true }, 'second operation should have italic attribute');
        assert.strictEqual(delta.ops[2].retain, 1, 'third operation should retain 1');
        assert.strictEqual(delta.ops[2].attributes, undefined, 'third operation should have no attributes');
        done();
    });
});