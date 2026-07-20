let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - non-string inserts', function(done) {
        const delta1 = new Delta([{ insert: { image: 'url1' } }]);
        const delta2 = new Delta([{ insert: { image: 'url2' } }]);
        
        const result = delta1.diff(delta2);
        assert.strictEqual(result.ops.length, 2, 'Should have insert and delete operations');
        assert.deepStrictEqual(result.ops[0], { insert: { image: 'url2' } }, 'Should insert new embed');
        assert.deepStrictEqual(result.ops[1], { delete: 1 }, 'Should delete old embed');
        done();
    });
});