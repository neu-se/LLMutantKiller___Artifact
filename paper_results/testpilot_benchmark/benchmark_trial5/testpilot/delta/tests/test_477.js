let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with counting operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { delete: 3 },
            { retain: 5 },
            { insert: 'World' }
        ]);
        
        // Test counting different operation types
        let counts = delta.reduce((acc, op) => {
            if (op.insert) acc.inserts++;
            if (op.delete) acc.deletes++;
            if (op.retain) acc.retains++;
            return acc;
        }, { inserts: 0, deletes: 0, retains: 0 });
        
        assert.strictEqual(counts.inserts, 2);
        assert.strictEqual(counts.deletes, 1);
        assert.strictEqual(counts.retains, 1);
        done();
    });
});