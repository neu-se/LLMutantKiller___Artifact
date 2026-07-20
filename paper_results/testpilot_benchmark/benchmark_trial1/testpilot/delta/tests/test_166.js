let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff', function(done) {
        // Test 1: Basic insertion diff
        const a1 = new quill_delta().insert('Hello');
        const b1 = new quill_delta().insert('Hello!');
        const diff1 = a1.diff(b1);
        
        assert.deepEqual(diff1.ops, [
            { retain: 5 },
            { insert: '!' }
        ]);
        
        // Verify that a.compose(diff) == b
        const composed1 = a1.compose(diff1);
        assert.deepEqual(composed1.ops, b1.ops);
        
        // Test 2: Basic deletion diff
        const a2 = new quill_delta().insert('Hello World');
        const b2 = new quill_delta().insert('Hello');
        const diff2 = a2.diff(b2);
        
        assert.deepEqual(diff2.ops, [
            { retain: 5 },
            { delete: 6 }
        ]);
        
        const composed2 = a2.compose(diff2);
        assert.deepEqual(composed2.ops, b2.ops);
        
        // Test 3: Replacement diff
        const a3 = new quill_delta().insert('Hello');
        const b3 = new quill_delta().insert('Hi');
        const diff3 = a3.diff(b3);
        
        const composed3 = a3.compose(diff3);
        assert.deepEqual(composed3.ops, b3.ops);
        
        // Test 4: Empty to non-empty
        const a4 = new quill_delta();
        const b4 = new quill_delta().insert('Hello');
        const diff4 = a4.diff(b4);
        
        assert.deepEqual(diff4.ops, [
            { insert: 'Hello' }
        ]);
        
        const composed4 = a4.compose(diff4);
        assert.deepEqual(composed4.ops, b4.ops);
        
        // Test 5: Non-empty to empty
        const a5 = new quill_delta().insert('Hello');
        const b5 = new quill_delta();
        const diff5 = a5.diff(b5);
        
        assert.deepEqual(diff5.ops, [
            { delete: 5 }
        ]);
        
        const composed5 = a5.compose(diff5);
        assert.deepEqual(composed5.ops, b5.ops);
        
        // Test 6: Identical deltas
        const a6 = new quill_delta().insert('Hello');
        const b6 = new quill_delta().insert('Hello');
        const diff6 = a6.diff(b6);
        
        assert.deepEqual(diff6.ops, []);
        
        const composed6 = a6.compose(diff6);
        assert.deepEqual(composed6.ops, b6.ops);
        
        done();
    });
});