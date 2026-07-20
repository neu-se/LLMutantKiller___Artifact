let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat', function(done) {
        // Test 1: Basic concatenation with text inserts
        const a = new Delta().insert('Hello');
        const b = new Delta().insert('!', { bold: true });
        const result1 = a.concat(b);
        
        assert.equal(result1.ops.length, 2);
        assert.equal(result1.ops[0].insert, 'Hello');
        assert.equal(result1.ops[1].insert, '!');
        assert.deepEqual(result1.ops[1].attributes, { bold: true });
        
        // Test 2: Concatenating with empty delta
        const c = new Delta().insert('World');
        const d = new Delta();
        const result2 = c.concat(d);
        
        assert.equal(result2.ops.length, 1);
        assert.equal(result2.ops[0].insert, 'World');
        
        // Test 3: Concatenating empty delta with non-empty delta
        const e = new Delta();
        const f = new Delta().insert('Test');
        const result3 = e.concat(f);
        
        assert.equal(result3.ops.length, 1);
        assert.equal(result3.ops[0].insert, 'Test');
        
        // Test 4: Concatenating multiple operations
        const g = new Delta().insert('First').retain(5);
        const h = new Delta().insert('Second').delete(3);
        const result4 = g.concat(h);
        
        assert.equal(result4.ops.length, 4);
        assert.equal(result4.ops[0].insert, 'First');
        assert.equal(result4.ops[1].retain, 5);
        assert.equal(result4.ops[2].insert, 'Second');
        assert.equal(result4.ops[3].delete, 3);
        
        // Test 5: Verify original deltas are not modified
        const original1 = new Delta().insert('Original');
        const original2 = new Delta().insert('Added');
        const originalOpsLength1 = original1.ops.length;
        const originalOpsLength2 = original2.ops.length;
        
        const result5 = original1.concat(original2);
        
        assert.equal(original1.ops.length, originalOpsLength1);
        assert.equal(original2.ops.length, originalOpsLength2);
        assert.equal(result5.ops.length, 2);
        
        done();
    });
});