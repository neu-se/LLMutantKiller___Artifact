let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat', function(done) {
        // Test 1: Basic concatenation with plain text
        const a = new quill_delta().insert('Hello');
        const b = new quill_delta().insert(' World');
        const result1 = a.concat(b);
        
        assert.deepEqual(result1.ops, [
            { insert: 'Hello' },
            { insert: ' World' }
        ]);
        
        // Test 2: Concatenation with attributes (from example)
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
        
        // Test 4: Concatenation with multiple operations
        const g = new quill_delta().insert('Line 1').insert('\n');
        const h = new quill_delta().insert('Line 2', { italic: true }).insert('\n');
        const result4 = g.concat(h);
        
        assert.deepEqual(result4.ops, [
            { insert: 'Line 1' },
            { insert: '\n' },
            { insert: 'Line 2', attributes: { italic: true } },
            { insert: '\n' }
        ]);
        
        // Test 5: Concatenation with retain and delete operations
        const i = new quill_delta().retain(5);
        const j = new quill_delta().delete(3).insert('new');
        const result5 = i.concat(j);
        
        assert.deepEqual(result5.ops, [
            { retain: 5 },
            { delete: 3 },
            { insert: 'new' }
        ]);
        
        // Test 6: Verify original deltas are not modified
        const original = new quill_delta().insert('Original');
        const toConcat = new quill_delta().insert(' Text');
        const originalOps = JSON.parse(JSON.stringify(original.ops));
        const toConcatOps = JSON.parse(JSON.stringify(toConcat.ops));
        
        original.concat(toConcat);
        
        assert.deepEqual(original.ops, originalOps);
        assert.deepEqual(toConcat.ops, toConcatOps);
        
        done();
    });
});