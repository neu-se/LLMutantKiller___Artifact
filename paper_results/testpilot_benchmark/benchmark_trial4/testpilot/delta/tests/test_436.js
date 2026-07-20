let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with insert operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' World' },
            { insert: '!' }
        ]);
        
        let mapped = delta.map(function(op) {
            if (op.insert && typeof op.insert === 'string') {
                return { insert: op.insert.toUpperCase() };
            }
            return op;
        });
        
        assert.deepEqual(mapped.ops, [
            { insert: 'HELLO' },
            { insert: ' WORLD' },
            { insert: '!' }
        ]);
        done();
    });
});