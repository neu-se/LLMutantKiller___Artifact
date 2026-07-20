let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with object accumulator', function(done) {
        // Create a delta with various operations
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { delete: 2 },
            { insert: 'world' }
        ]);
        
        // Test reduce to categorize operations
        let stats = delta.reduce((acc, op) => {
            if (op.retain) acc.retains++;
            if (op.insert) acc.inserts++;
            if (op.delete) acc.deletes++;
            return acc;
        }, { retains: 0, inserts: 0, deletes: 0 });
        
        assert.strictEqual(stats.retains, 1);
        assert.strictEqual(stats.inserts, 2);
        assert.strictEqual(stats.deletes, 1);
        done();
    });
});