let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with array building', function(done) {
        // Create a delta with various operations
        let delta = new quill_delta([
            { insert: 'A' },
            { retain: 1 },
            { insert: 'B' },
            { delete: 2 }
        ]);
        
        // Test reduce to build array of operation types
        let opTypes = delta.reduce((acc, op) => {
            if (op.insert) acc.push('insert');
            if (op.retain) acc.push('retain');
            if (op.delete) acc.push('delete');
            return acc;
        }, []);
        
        assert.deepStrictEqual(opTypes, ['insert', 'retain', 'insert', 'delete']);
        done();
    });
});