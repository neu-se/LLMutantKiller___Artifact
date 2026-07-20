let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should filter operations', function(done) {
        const delta = new quill_delta([
            { insert: 'hello' },
            { delete: 3 },
            { retain: 2 }
        ]);
        const insertOps = delta.filter(op => op.insert);
        assert.deepEqual(insertOps, [{ insert: 'hello' }]);
        done();
    });
});