let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with numeric accumulator', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { delete: 3 },
            { retain: 5 },
            { insert: 'World' }
        ]);
        
        // Test summing operation lengths
        let totalLength = delta.reduce((acc, op) => {
            if (op.insert && typeof op.insert === 'string') {
                return acc + op.insert.length;
            }
            if (op.delete) {
                return acc + op.delete;
            }
            if (op.retain) {
                return acc + op.retain;
            }
            return acc;
        }, 0);
        
        assert.strictEqual(totalLength, 18); // 5 + 3 + 5 + 5
        done();
    });
});