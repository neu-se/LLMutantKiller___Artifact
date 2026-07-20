let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with operation counting', function(done) {
        // Create a delta with mixed operations
        let delta = new quill_delta([
            { retain: 2 },
            { insert: 'test' },
            { delete: 1 },
            { retain: 5 },
            { insert: 'more' }
        ]);
        
        // Test reduce to count different operation types
        let opCounts = delta.reduce((acc, op) => {
            if (op.retain) acc.retains++;
            if (op.insert) acc.inserts++;
            if (op.delete) acc.deletes++;
            return acc;
        }, { retains: 0, inserts: 0, deletes: 0 });
        
        assert.strictEqual(opCounts.retains, 2);
        assert.strictEqual(opCounts.inserts, 2);
        assert.strictEqual(opCounts.deletes, 1);
        done();
    });

    })