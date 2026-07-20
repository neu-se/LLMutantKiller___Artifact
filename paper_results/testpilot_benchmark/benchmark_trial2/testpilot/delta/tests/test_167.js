let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat', function(done) {
        // Test 1: Basic concatenation with plain text (operations get merged)
        const a = new quill_delta().insert('Hello');
        const b = new quill_delta().insert(' World');
        const result1 = a.concat(b);
        
        assert.deepEqual(result1.ops, [
            { insert: 'Hello World' }
        ]);
        
        // Test 2: Concatenation with different attributes (operations stay separate)
        const c = new quill_delta().insert('Hello');
        const d = new quill_delta().insert('!', { bold: true });
        const result2 = c.concat(d);
        
        assert.deepEqual(result2.ops, [
            { insert: 'Hello' },
            { insert: '!', attributes: { bold: true } }
        ]);
        
        // Test 3: Concatenation with empty delta
        const e = new quill_delta().insert('Test');
        const f = new quill_delta();
        const result3 = e.concat(f);
        
        assert.deepEqual(result3.ops, [
            { insert: 'Test' }
        ]);
        
        // Test 4: Concatenating empty delta to non-empty
        const g = new quill_delta();
        const h = new quill_delta().insert('Content');
        const result4 = g.concat(h);
        
        assert.deepEqual(result4.ops, [
            { insert: 'Content' }
        ]);
        
        // Test 5: Concatenation with multiple operations
        const i = new quill_delta().insert('First').retain(5);
        const j = new quill_delta().delete(3).insert('Second');
        const result5 = i.concat(j);
        
        assert.deepEqual(result5.ops, [
            { insert: 'First' },
            { retain: 5 },
            { delete: 3 },
            { insert: 'Second' }
        ]);
        
        // Test 6: Original deltas should remain unchanged
        const original = new quill_delta().insert('Original');
        const toConcat = new quill_delta().insert('Added');
        const concatenated = original.concat(toConcat);
        
        assert.deepEqual(original.ops, [{ insert: 'Original' }]);
        assert.deepEqual(toConcat.ops, [{ insert: 'Added' }]);
        assert.deepEqual(concatenated.ops, [
            { insert: 'OriginalAdded' }
        ]);
        
        done();
    });
});