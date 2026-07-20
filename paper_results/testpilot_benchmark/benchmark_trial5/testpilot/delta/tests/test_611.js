let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff', function(done) {
        // Test 1: Basic insertion diff
        const a1 = new quill_delta().insert('Hello');
        const b1 = new quill_delta().insert('Hello!');
        const diff1 = a1.diff(b1);
        
        assert.deepEqual(diff1.ops, [{ retain: 5 }, { insert: '!' }]);
        assert.deepEqual(a1.compose(diff1), b1);
        
        // Test 2: Basic deletion diff
        const a2 = new quill_delta().insert('Hello World');
        const b2 = new quill_delta().insert('Hello');
        const diff2 = a2.diff(b2);
        
        assert.deepEqual(diff2.ops, [{ retain: 5 }, { delete: 6 }]);
        assert.deepEqual(a2.compose(diff2), b2);
        
        // Test 3: Text replacement
        const a3 = new quill_delta().insert('Hello World');
        const b3 = new quill_delta().insert('Hello Universe');
        const diff3 = a3.diff(b3);
        
        assert.deepEqual(diff3.ops, [{ retain: 6 }, { delete: 5 }, { insert: 'Universe' }]);
        assert.deepEqual(a3.compose(diff3), b3);
        
        // Test 4: Identical deltas
        const a4 = new quill_delta().insert('Same text');
        const b4 = new quill_delta().insert('Same text');
        const diff4 = a4.diff(b4);
        
        assert.deepEqual(diff4.ops, []);
        assert.deepEqual(a4.compose(diff4), b4);
        
        // Test 5: Empty to non-empty
        const a5 = new quill_delta();
        const b5 = new quill_delta().insert('New content');
        const diff5 = a5.diff(b5);
        
        assert.deepEqual(diff5.ops, [{ insert: 'New content' }]);
        assert.deepEqual(a5.compose(diff5), b5);
        
        // Test 6: Non-empty to empty
        const a6 = new quill_delta().insert('Remove this');
        const b6 = new quill_delta();
        const diff6 = a6.diff(b6);
        
        assert.deepEqual(diff6.ops, [{ delete: 11 }]);
        assert.deepEqual(a6.compose(diff6), b6);
        
        // Test 7: With cursor parameter
        const a7 = new quill_delta().insert('Hello World');
        const b7 = new quill_delta().insert('Hello Beautiful World');
        const cursor = { index: 6, length: 0 };
        const diff7 = a7.diff(b7, cursor);
        
        // Verify the diff works correctly
        assert.deepEqual(a7.compose(diff7), b7);
        
        done();
    });
});