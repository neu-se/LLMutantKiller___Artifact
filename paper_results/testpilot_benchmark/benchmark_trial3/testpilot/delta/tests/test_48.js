let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should create delta with delete operations', function(done) {
        let ops = [
            { retain: 3 },
            { delete: 2 },
            { insert: 'new' }
        ];
        let delta = new Delta(ops);
        assert.strictEqual(delta.ops.length, 3);
        assert.strictEqual(delta.ops[0].retain, 3);
        assert.strictEqual(delta.ops[1].delete, 2);
        assert.strictEqual(delta.ops[2].insert, 'new');
        done();
    });
});