let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - should optimize consecutive operations', function(done) {
        let delta = new Delta();
        let insertOp1 = { insert: 'Hello' };
        let insertOp2 = { insert: ' World' };
        
        delta.push(insertOp1);
        delta.push(insertOp2);
        
        // Quill Delta automatically optimizes consecutive insert operations
        assert.strictEqual(delta.ops.length, 1, 'consecutive inserts should be merged');
        assert.strictEqual(delta.ops[0].insert, 'Hello World', 'text should be concatenated');
        done();
    });
});