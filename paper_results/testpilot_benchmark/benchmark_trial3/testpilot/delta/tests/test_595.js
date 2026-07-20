let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff', function(done) {
        // Test 1: Basic insertion diff
        const a1 = new quill_delta().insert('Hello');
        const b1 = new quill_delta().insert('Hello!');
        const diff1 = a1.diff(b1);
        assert.deepEqual(diff1.ops, [{ retain: 5 }, { insert: '!' }]);
        
        // Test 2: Basic deletion diff
        const a2 = new quill_delta().insert('Hello World');
        const b2 = new quill_delta().insert('Hello');
        const diff2 = a2.diff(b2);
        assert.deepEqual(diff2.ops, [{ retain: 5 }, { delete: 6 }]);
        
        // Test 3: Replacement diff
        const a3 = new quill_delta().insert('Hello');
        const b3 = new quill_delta().insert('Hi');
        const diff3 = a3.diff(b3);
        assert.deepEqual(diff3.ops, [{ insert: 'Hi' }, { delete: 5 }]);
        
        // Test 4: Same content - should return empty delta
        const a4 = new quill_delta().insert('Hello');
        const b4 = new quill_delta().insert('Hello');
        const diff4 = a4.diff(b4);
        assert.deepEqual(diff4.ops, []);
        
        // Test 5: Empty to content
        const a5 = new quill_delta();
        const b5 = new quill_delta().insert('Hello');
        const diff5 = a5.diff(b5);
        assert.deepEqual(diff5.ops, [{ insert: 'Hello' }]);
        
        // Test 6: Content to empty
        const a6 = new quill_delta().insert('Hello');
        const b6 = new quill_delta();
        const diff6 = a6.diff(b6);
        assert.deepEqual(diff6.ops, [{ delete: 5 }]);
        
        // Test 7: Complex diff with multiple operations
        const a7 = new quill_delta().insert('The quick brown fox');
        const b7 = new quill_delta().insert('A quick red fox jumps');
        const diff7 = a7.diff(b7);
        // Verify that applying the diff to a7 produces b7
        const result7 = a7.compose(diff7);
        assert.deepEqual(result7.ops, b7.ops);
        
        // Test 8: Diff with attributes
        const a8 = new quill_delta().insert('Hello', { bold: true });
        const b8 = new quill_delta().insert('Hello', { italic: true });
        const diff8 = a8.diff(b8);
        const result8 = a8.compose(diff8);
        assert.deepEqual(result8.ops, b8.ops);
        
        done();
    });
});