let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff', function(done) {
        // Test 1: Basic insertion diff
        const a1 = new Delta().insert('Hello');
        const b1 = new Delta().insert('Hello!');
        const diff1 = a1.diff(b1);
        assert.deepEqual(diff1.ops, [{ retain: 5 }, { insert: '!' }]);
        
        // Test 2: Basic deletion diff
        const a2 = new Delta().insert('Hello World');
        const b2 = new Delta().insert('Hello');
        const diff2 = a2.diff(b2);
        assert.deepEqual(diff2.ops, [{ retain: 5 }, { delete: 6 }]);
        
        // Test 3: Replacement diff
        const a3 = new Delta().insert('Hello');
        const b3 = new Delta().insert('Hi');
        const diff3 = a3.diff(b3);
        assert.deepEqual(diff3.ops, [{ retain: 1 }, { insert: 'i' }, { delete: 4 }]);
        
        // Test 4: Same content should return empty delta
        const a4 = new Delta().insert('Same text');
        const b4 = new Delta().insert('Same text');
        const diff4 = a4.diff(b4);
        assert.deepEqual(diff4.ops, []);
        
        // Test 5: Empty to non-empty
        const a5 = new Delta();
        const b5 = new Delta().insert('New content');
        const diff5 = a5.diff(b5);
        assert.deepEqual(diff5.ops, [{ insert: 'New content' }]);
        
        // Test 6: Non-empty to empty
        const a6 = new Delta().insert('Remove this');
        const b6 = new Delta();
        const diff6 = a6.diff(b6);
        assert.deepEqual(diff6.ops, [{ delete: 11 }]);
        
        // Test 7: Complex diff with multiple operations
        const a7 = new Delta().insert('The quick brown fox');
        const b7 = new Delta().insert('A quick red fox jumps');
        const diff7 = a7.diff(b7);
        // Verify that applying the diff gives the expected result
        const result7 = a7.compose(diff7);
        assert.deepEqual(result7.ops, b7.ops);
        
        // Test 8: Same reference should return empty delta
        const a8 = new Delta().insert('Test');
        const diff8 = a8.diff(a8);
        assert.deepEqual(diff8.ops, []);
        
        done();
    });
});