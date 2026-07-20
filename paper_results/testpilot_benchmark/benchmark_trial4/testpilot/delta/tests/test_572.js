let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat', function(done) {
        // Test 1: Basic concatenation with text inserts
        const a = new Delta().insert('Hello');
        const b = new Delta().insert('!', { bold: true });
        const result1 = a.concat(b);
        
        assert.strictEqual(result1.ops.length, 2);
        assert.strictEqual(result1.ops[0].insert, 'Hello');
        assert.strictEqual(result1.ops[1].insert, '!');
        assert.deepStrictEqual(result1.ops[1].attributes, { bold: true });
        
        // Test 2: Concatenating with empty delta
        const c = new Delta().insert('World');
        const d = new Delta();
        const result2 = c.concat(d);
        
        assert.strictEqual(result2.ops.length, 1);
        assert.strictEqual(result2.ops[0].insert, 'World');
        
        // Test 3: Concatenating empty delta with non-empty delta
        const e = new Delta();
        const f = new Delta().insert('Test');
        const result3 = e.concat(f);
        
        assert.strictEqual(result3.ops.length, 1);
        assert.strictEqual(result3.ops[0].insert, 'Test');
        
        // Test 4: Concatenating deltas with multiple operations
        const g = new Delta().insert('Hello').insert(' ');
        const h = new Delta().insert('World').delete(1);
        const result4 = g.concat(h);
        
        assert.strictEqual(result4.ops.length, 4);
        assert.strictEqual(result4.ops[0].insert, 'Hello');
        assert.strictEqual(result4.ops[1].insert, ' ');
        assert.strictEqual(result4.ops[2].insert, 'World');
        assert.strictEqual(result4.ops[3].delete, 1);
        
        // Test 5: Verify original deltas are not modified
        const original = new Delta().insert('Original');
        const toConcat = new Delta().insert('Added');
        const originalOpsLength = original.ops.length;
        const toConcatOpsLength = toConcat.ops.length;
        
        const result5 = original.concat(toConcat);
        
        assert.strictEqual(original.ops.length, originalOpsLength);
        assert.strictEqual(toConcat.ops.length, toConcatOpsLength);
        assert.strictEqual(original.ops[0].insert, 'Original');
        
        // Test 6: Concatenating two empty deltas
        const empty1 = new Delta();
        const empty2 = new Delta();
        const result6 = empty1.concat(empty2);
        
        assert.strictEqual(result6.ops.length, 0);
        
        done();
    });
});