let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - text replacement', function(done) {
        const delta1 = new Delta([{ insert: 'Hello World' }]);
        const delta2 = new Delta([{ insert: 'Hello Universe' }]);
        
        const result = delta1.diff(delta2);
        
        assert.strictEqual(result.ops.length, 3, 'Should have retain, insert, and delete operations');
        assert.deepStrictEqual(result.ops[0], { retain: 6 }, 'Should retain "Hello "');
        assert.deepStrictEqual(result.ops[1], { insert: 'Universe' }, 'Should insert "Universe"');
        assert.deepStrictEqual(result.ops[2], { delete: 5 }, 'Should delete "World"');
        done();
    });
});