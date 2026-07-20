let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with delete operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Keep this' },
            { delete: 5 },
            { insert: 'and this' }
        ]);
        
        let mappedOps = delta.ops.map(function(op) {
            if (op.delete) {
                return { delete: op.delete + 1 };
            }
            return op;
        });
        
        let mapped = new quill_delta(mappedOps);
        
        assert.deepEqual(mapped.ops, [
            { insert: 'Keep this' },
            { delete: 6 },
            { insert: 'and this' }
        ]);
        done();
    });
});