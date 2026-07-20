let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should insert text with attributes', function(done) {
        let delta = new Delta();
        delta.insert('Bold text', { bold: true });
        assert.strictEqual(delta.ops.length, 1);
        assert.strictEqual(delta.ops[0].insert, 'Bold text');
        assert.deepStrictEqual(delta.ops[0].attributes, { bold: true });
        done();
    });
});