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
        
        // Test 4: Empty to text
        const a4 = new quill_delta();
        const b4 = new quill_delta().insert('Hello');
        const diff4 = a4.diff(b4);
        
        assert.deepEqual(diff4.ops, [{ insert: 'Hello' }]);
        assert.deepEqual(a4.compose(diff4), b4);
        
        // Test 5: Text to empty
        const a5 = new quill_delta().insert('Hello');
        const b5 = new quill_delta();
        const diff5 = a5.diff(b5);
        
        assert.deepEqual(diff5.ops, [{ delete: 5 }]);
        assert.deepEqual(a5.compose(diff5), b5);
        
        // Test 6: Identical deltas
        const a6 = new quill_delta().insert('Hello');
        const b6 = new quill_delta().insert('Hello');
        const diff6 = a6.diff(b6);
        
        assert.deepEqual(diff6.ops, []);
        assert.deepEqual(a6.compose(diff6), b6);
        
        // Test 7: With cursor parameter
        const a7 = new quill_delta().insert('Hello World');
        const b7 = new quill_delta().insert('Hello Beautiful World');
        const diff7 = a7.diff(b7, 6); // cursor at position 6
        const composed7 = a7.compose(diff7);
        
        assert.deepEqual(composed7, b7);
        
        done();
    });
});